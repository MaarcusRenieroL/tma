package com.tma.user_micro_service.service.implementation;

import com.resend.Resend;
import com.resend.services.emails.model.SendEmailRequest;
import com.resend.services.emails.model.SendEmailResponse;
import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.PasswordResetToken;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.repository.PasswordResetTokenRepository;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.AuthService;
import com.tma.user_micro_service.util.JwtUtils;
import com.tma.user_micro_service.util.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AuthServiceImplementation implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthServiceImplementation(
      AuthenticationManager authenticationManager,
      JwtUtils jwtUtils,
      UserRepository userRepository,
      RoleRepository roleRepository,
      PasswordEncoder passwordEncoder,
      PasswordResetTokenRepository passwordResetTokenRepository) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
  }

  public SignInResponse signIn(SignInRequest signInRequest) {
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

      return new SignInResponse(userDetails.getUsername(), jwtToken, roles);

    } catch (Exception exception) {
      throw new AuthenticationServiceException("Invalid username or password", exception);
    }
  }

  public User signUp(SignUpRequest signUpRequest) {
    if (userRepository.findByUserName(signUpRequest.getUsername()).isPresent()) {
      throw new IllegalArgumentException("Error: Username is already taken!");
    }

    User user =
        new User(
            signUpRequest.getUsername(),
            passwordEncoder.encode(signUpRequest.getPassword()),
            signUpRequest.getEmail());

    List<String> strRoles = signUpRequest.getRole();

    Role role;

    if (strRoles == null || strRoles.isEmpty()) {
      role =
          roleRepository
              .findByRoleName(AppRole.ROLE_DEVELOPER)
              .orElseThrow(() -> new RuntimeException("Error: Default role is not found."));
    } else {
      String roleStr = strRoles.getFirst();
      role =
          roleRepository
              .findByRoleName(
                  roleStr.equalsIgnoreCase("admin") ? AppRole.ROLE_ADMIN : AppRole.ROLE_DEVELOPER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    }
    user.setRole(role);

    return Utilities.setupUser(roleRepository, userRepository, user, role.getRoleName());
  }

  public void signOut() {}

  public CsrfToken generateCsrfToken(HttpServletRequest request) {
    return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
  }

  public String forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
    Optional<User> optionalUser = userRepository.findByEmail(forgotPasswordRequest.getEmail());

    if (optionalUser.isEmpty()) {
      return "If the email exists, you'll receive an email";
    }

    PasswordResetToken passwordResetToken =
        new PasswordResetToken(
            optionalUser.get(), UUID.randomUUID(), LocalDateTime.now().plusHours(1), false);

    passwordResetTokenRepository.save(passwordResetToken);

    log.info("Email service called");

    Resend resend = new Resend("re_RkyGG486_717MqZUU1DqzzHwnf3QZXaPy");

    SendEmailRequest sendEmailRequest =
        SendEmailRequest.builder()
            .from("Acme <onboarding@resend.dev>")
            .to("maarcusreniero.l@gmail.com")
            .html(
                """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 text-gray-800">
          <div class="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-6">
              <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">Password Reset Request</h1>
              <p class="text-gray-600 text-base leading-6">
                Hi, <br><br>
                You recently requested to reset your password. Click the button below to reset it. This link will expire in <strong>15 minutes</strong>.
              </p>
              <div class="text-center my-6">
                <a href="{{RESET_LINK}}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                  Reset Your Password
                </a>
              </div>
              <p class="text-gray-600 text-sm">
                If you did not request a password reset, please ignore this email or contact support if you have concerns.
              </p>
              <div class="border-t mt-6 pt-4 text-center">
                <p class="text-xs text-gray-500">
                  &copy; 2024 SyncTeam. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>

        """)
            .subject("Request for Reset Password")
            .build();

    SendEmailResponse data = resend.emails().send(sendEmailRequest);

    log.info("Data: {}", data.getId());

    passwordResetTokenRepository.delete(passwordResetToken);

    return "If the email exists, you'll receive an email";
  }
}
