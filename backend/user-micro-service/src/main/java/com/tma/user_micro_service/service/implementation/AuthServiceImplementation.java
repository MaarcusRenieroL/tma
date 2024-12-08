package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.model.*;
import com.tma.user_micro_service.payload.request.*;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.repository.PasswordResetTokenRepository;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.repository.VerifyEmailTokenRepository;
import com.tma.user_micro_service.service.AuthService;
import com.tma.user_micro_service.util.JwtUtils;
import com.tma.user_micro_service.util.ResponseUtil;
import com.tma.user_micro_service.util.Utilities;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Slf4j
@Service
public class AuthServiceImplementation implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final VerifyEmailTokenRepository verifyEmailTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final SesClient sesClient;
  Dotenv dotenv = Dotenv.configure().load();

  public AuthServiceImplementation(
      AuthenticationManager authenticationManager,
      JwtUtils jwtUtils,
      UserRepository userRepository,
      RoleRepository roleRepository,
      PasswordEncoder passwordEncoder,
      SesClient sesClient,
      PasswordResetTokenRepository passwordResetTokenRepository,
      VerifyEmailTokenRepository verifyEmailTokenRepository) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
    this.verifyEmailTokenRepository = verifyEmailTokenRepository;
    this.sesClient = sesClient;
  }

  public ResponseEntity<StandardResponse<SignInResponse>> signIn(
      SignInRequest signInRequest, HttpServletRequest request) {
    if (signInRequest.getUsername().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Username should not be empty", request, LocalDateTime.now());
    }

    if (signInRequest.getPassword().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Password should not be empty", request, LocalDateTime.now());
    }
    try {
      Authentication authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  signInRequest.getUsername(), signInRequest.getPassword()));

      SecurityContextHolder.getContext().setAuthentication(authentication);

      UserDetails userDetails = (UserDetails) authentication.getPrincipal();

      String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

      List<String> roles =
          userDetails.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      Optional<User> optionalUser = userRepository.findByUserName(userDetails.getUsername());
      if (optionalUser.isPresent()) {
        User user = optionalUser.get();

        return ResponseUtil.buildSuccessMessage(
            HttpStatus.OK,
            "Successfully authenticated",
            new SignInResponse(
                user.getUserId(),
                userDetails.getUsername(),
                user.getEmail(),
                jwtToken,
                roles,
                user.isOnboarded(),
                user.isVerified()),
            request,
            LocalDateTime.now());
      } else {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
      }

    } catch (Exception exception) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.UNAUTHORIZED, "User not authorized", request, LocalDateTime.now());
    }
  }

  public ResponseEntity<StandardResponse<UserResponse>> signUp(
      SignUpRequest signUpRequest, HttpServletRequest request) {

    if (signUpRequest.getUsername().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Username is required", request, LocalDateTime.now());
    }

    if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Passwords don't match'", request, LocalDateTime.now());
    }

    if (userRepository.findByUserName(signUpRequest.getUsername()).isPresent()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Username is already taken", request, LocalDateTime.now());
    }

    User user =
        new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            passwordEncoder.encode(signUpRequest.getPassword()));

    Role role =
        roleRepository
            .findByRoleName(AppRole.ROLE_DEVELOPER)
            .orElseThrow(() -> new RuntimeException("Error: Default role is not found."));

    user.setRole(role);

    Utilities.setupUser(roleRepository, userRepository, user, role.getRoleName());

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.CREATED,
        "User created successfully",
        new UserResponse(
            user.getUserId(),
            user.getUserName(),
            user.getName(),
            user.getEmail(),
            user.getLocation(),
            user.getRole().getRoleName().toString(),
            user.getOrganizationId()),
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<String>> sendEmailVerificationToken(
      SendEmailVerificationTokenRequest sendEmailVerificationTokenRequest,
      HttpServletRequest request) {

    if (sendEmailVerificationTokenRequest.getEmail() == null
        || sendEmailVerificationTokenRequest.getEmail().trim().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Email address is required. Please provide a valid email address.",
          request,
          LocalDateTime.now());
    }

    Optional<User> optionalUser =
        userRepository.findByEmail(sendEmailVerificationTokenRequest.getEmail());

    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
    }

    User existingUser = optionalUser.get();

    Optional<VerifyEmailToken> existingTokenOpt =
        verifyEmailTokenRepository.findByUser_UserId(existingUser.getUserId());

    if (existingTokenOpt.isPresent()) {
      VerifyEmailToken existingToken = existingTokenOpt.get();
      if (!existingToken.isTokenUsed()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST,
            "A password reset request is already pending for this account.",
            request,
            LocalDateTime.now());
      }
    }

    Random random = new Random();
    int token = 100000 + random.nextInt(900000);
    VerifyEmailToken verifyEmailToken =
        new VerifyEmailToken(existingUser, token, LocalDateTime.now().plusHours(1), false);

    verifyEmailTokenRepository.save(verifyEmailToken);

    sendEmail(sendEmailVerificationTokenRequest.getEmail(), token, existingUser, true, false);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "If the provided email address is associated with an account, a reset password link has been sent.",
        null,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Void>> forgotPassword(
      ForgotPasswordRequest forgotPasswordRequest, HttpServletRequest request) {

    if (forgotPasswordRequest.getEmail() == null
        || forgotPasswordRequest.getEmail().trim().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Email address is required. Please provide a valid email address.",
          request,
          LocalDateTime.now());
    }

    Optional<User> optionalUser = userRepository.findByEmail(forgotPasswordRequest.getEmail());

    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
    }

    User existingUser = optionalUser.get();

    Optional<PasswordResetToken> existingTokenOpt =
        passwordResetTokenRepository.findByUser_UserId(existingUser.getUserId());

    if (existingTokenOpt.isPresent()) {
      PasswordResetToken existingToken = existingTokenOpt.get();
      if (!existingToken.isTokenUsed()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST,
            "A password reset request is already pending for this account.",
            request,
            LocalDateTime.now());
      }
    }

    Random random = new Random();
    int token = 100000 + random.nextInt(900000);
    PasswordResetToken passwordResetToken =
        new PasswordResetToken(existingUser, token, LocalDateTime.now().plusHours(1), false);
    passwordResetTokenRepository.save(passwordResetToken);

    log.info("Email service called");

    sendEmail(forgotPasswordRequest.getEmail(), token, existingUser, false, true);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "If the provided email address is associated with an account, a reset password link has been sent.",
        null,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Boolean>> verifyEmail(
      VerifyTokenRequest verifyTokenRequest, HttpServletRequest request) {
    if (verifyTokenRequest.getToken() <= 0 || verifyTokenRequest.getUserId() == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Missing or invalid required fields",
          request,
          LocalDateTime.now());
    }

    Optional<User> optionalUser = userRepository.findById(verifyTokenRequest.getUserId());

    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
    }

    Optional<VerifyEmailToken> existingTokenOpt =
        verifyEmailTokenRepository.findByUser_UserId(verifyTokenRequest.getUserId());

    if (existingTokenOpt.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Token or user not found", request, LocalDateTime.now());
    }

    VerifyEmailToken existingToken = existingTokenOpt.get();

    if (existingToken.isTokenUsed()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "This token is already used", request, LocalDateTime.now());
    }

    if (existingToken.getExpiryDate().isBefore(LocalDateTime.now())) {
      verifyEmailTokenRepository.delete(existingToken);
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "This token has expired", request, LocalDateTime.now());
    }

    if (existingToken.getToken() != verifyTokenRequest.getToken()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Invalid token", request, LocalDateTime.now());
    }

    existingToken.setTokenUsed(true);
    optionalUser.get().setVerified(true);
    userRepository.save(optionalUser.get());
    verifyEmailTokenRepository.save(existingToken);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "User verified successfully", true, request, LocalDateTime.now());
  }

  private String getEmailBodyContentForResetPassword(int token, User user) {
    return "Hi "
        + user.getName()
        + ",\n\n"
        + "We received a request to reset your password. Use the code below to reset your password:\n\n"
        + token
        + "\n\n"
        + "Please note that the code will expire in 1 hour.\n\n"
        + "If you didn't request a password reset, please ignore this email.\n\n"
        + "Best regards,\n"
        + "The SyncTeam\n"
        + "Contact us at support@maarcus.dev if you have any questions.";
  }

  private String getEmailBodyContentForVerifyEmail(int token, User user) {
    return "Hi "
        + user.getName()
        + ",\n\n"
        + "We received a request to verify your email. Use the code below to verify your email:\n\n"
        + token
        + "\n\n"
        + "Please note that the code will expire in 1 hour.\n\n"
        + "If you didn't request a verification email, please ignore this email.\n\n"
        + "Best regards,\n"
        + "The SyncTeam\n"
        + "Contact us at support@maarcus.dev if you have any questions.";
  }

  private void sendEmail(
      String destinationEmail, int token, User user, boolean verifyEmail, boolean passwordReset) {
    String emailBodyContent =
        verifyEmail
            ? getEmailBodyContentForVerifyEmail(token, user)
            : getEmailBodyContentForResetPassword(token, user);

    String subject = verifyEmail ? "Verify Your Email" : "Reset Your Password";

    Destination destination = Destination.builder().toAddresses(destinationEmail).build();

    Content subjectContent = Content.builder().data(subject).build();
    Content bodyContent = Content.builder().data(emailBodyContent).build();
    Body emailBody = Body.builder().text(bodyContent).build();

    Message message = Message.builder().subject(subjectContent).body(emailBody).build();

    SendEmailRequest sendEmailRequest =
        SendEmailRequest.builder()
            .source(dotenv.get("AWS_SES_VERIFIED_EMAIL"))
            .destination(destination)
            .message(message)
            .build();

    sesClient.sendEmail(sendEmailRequest);

    log.info("Email sent successfully to {}", destinationEmail);
  }
}
