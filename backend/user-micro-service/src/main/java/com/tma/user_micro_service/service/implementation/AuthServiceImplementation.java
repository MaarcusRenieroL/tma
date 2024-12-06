package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.PasswordResetToken;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.repository.PasswordResetTokenRepository;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.AuthService;
import com.tma.user_micro_service.util.JwtUtils;
import com.tma.user_micro_service.util.ResponseUtil;
import com.tma.user_micro_service.util.Utilities;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
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
import org.springframework.security.web.csrf.CsrfToken;
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
  private final PasswordEncoder passwordEncoder;
  private final SesClient sesClient;

  public AuthServiceImplementation(
      AuthenticationManager authenticationManager,
      JwtUtils jwtUtils,
      UserRepository userRepository,
      RoleRepository roleRepository,
      PasswordEncoder passwordEncoder,
      SesClient sesClient,
      PasswordResetTokenRepository passwordResetTokenRepository) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
    this.sesClient = sesClient;
  }

  Dotenv dotenv = Dotenv.configure().load();

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
        SignInResponse signInResponse =
            new SignInResponse(
                user.getUserId(), userDetails.getUsername(), jwtToken, roles, user.isOnboarded());

        return ResponseUtil.buildSuccessMessage(
            HttpStatus.OK,
            "Successfully authenticated",
            signInResponse,
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
            user.getTeamIds()),
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<CsrfToken>> generateCsrfToken(HttpServletRequest request) {
    CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.CREATED, "Token generated successfully", token, request, LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Void>> forgotPassword(
      ForgotPasswordRequest forgotPasswordRequest, HttpServletRequest request) {

    // Check if the email is null or empty
    if (forgotPasswordRequest.getEmail() == null
        || forgotPasswordRequest.getEmail().trim().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Email address is required. Please provide a valid email address.",
          request,
          LocalDateTime.now());
    }

    // Retrieve the user by email
    Optional<User> optionalUser = userRepository.findByEmail(forgotPasswordRequest.getEmail());

    // If user not found, return error
    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
    }

    User existingUser = optionalUser.get();

    // Check if there's already a valid token for the user
    Optional<PasswordResetToken> existingTokenOpt =
        passwordResetTokenRepository.findByUser_UserId(existingUser.getUserId());

    // If there's an existing token, check if it's still valid
    if (existingTokenOpt.isPresent()) {
      PasswordResetToken existingToken = existingTokenOpt.get();
      if (!existingToken.isTokenUsed()) {
        // Token exists and is not expired, reject the request
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST,
            "A password reset request is already pending for this account.",
            request,
            LocalDateTime.now());
      }
    }

    // Generate a new token if no valid token exists
    UUID token = UUID.randomUUID();
    PasswordResetToken passwordResetToken =
        new PasswordResetToken(existingUser, token, LocalDateTime.now().plusHours(1), false);
    passwordResetTokenRepository.save(passwordResetToken);

    log.info("Email service called");

    // Get email body content
    String emailBodyContent = getEmailBodyContent(token, existingUser);

    // Setup email parameters
    Destination destination =
        Destination.builder().toAddresses(forgotPasswordRequest.getEmail()).build();

    Content subjectContent = Content.builder().data("Password Reset Request").build();

    Content bodyContent = Content.builder().data(emailBodyContent).build();

    Body emailBody = Body.builder().text(bodyContent).build();

    Message message = Message.builder().subject(subjectContent).body(emailBody).build();

    SendEmailRequest sendEmailRequest =
        SendEmailRequest.builder()
            .source(dotenv.get("AWS_SES_VERIFIED_EMAIL")) // Replace with your verified email
            .destination(destination)
            .message(message)
            .build();

    // Send email
    sesClient.sendEmail(sendEmailRequest);

    System.out.println("Email sent successfully!");

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "If the provided email address is associated with an account, a reset password link has been sent.",
        null,
        request,
        LocalDateTime.now());
  }

  private String getEmailBodyContent(UUID token, User user) {
    String resetLink = "https://www.yourdomain.com/reset-password?token=" + token.toString();

    return "Hi "
        + user.getName()
        + ",\n\n"
        + // Personalize greeting
        "We received a request to reset your password. Click the link below to reset your password:\n\n"
        + resetLink
        + "\n\n"
        + "Please note that the link will expire in 1 hour.\n\n"
        + "If you didn't request a password reset, please ignore this email.\n\n"
        + "Best regards,\n"
        + "The YourApp Team\n"
        + "Contact us at support@maarcus.dev if you have any questions.";
  }
}
