package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.AuthService;
import com.tma.user_micro_service.util.JwtUtils;
import com.tma.user_micro_service.util.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;
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

@Service
public class AuthServiceImplementation implements AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthServiceImplementation(
      AuthenticationManager authenticationManager,
      JwtUtils jwtUtils,
      UserRepository userRepository,
      RoleRepository roleRepository,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.jwtUtils = jwtUtils;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
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
}
