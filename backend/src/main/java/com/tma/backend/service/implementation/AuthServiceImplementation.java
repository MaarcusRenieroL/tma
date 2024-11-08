package com.tma.backend.service.implementation;

import com.tma.backend.model.AppRole;
import com.tma.backend.model.Role;
import com.tma.backend.model.User;
import com.tma.backend.payload.request.LoginRequest;
import com.tma.backend.payload.request.SignUpRequest;
import com.tma.backend.payload.response.LoginResponse;
import com.tma.backend.repository.RoleRepository;
import com.tma.backend.repository.UserRepository;
import com.tma.backend.service.AuthService;
import com.tma.backend.util.JwtUtils;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImplementation implements AuthService {

  @Autowired private AuthenticationManager authenticationManager;
  @Autowired private JwtUtils jwtUtils;
  @Autowired private RoleRepository roleRepository;
  @Autowired private UserRepository userRepository;
  @Autowired private PasswordEncoder passwordEncoder;

  public LoginResponse authenticateUser(LoginRequest loginRequest) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUserName(), loginRequest.getPassword()));

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
    List<String> roles =
        userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());

    return new LoginResponse(jwtToken, userDetails.getUsername(), roles);
  }

  public User registerUser(SignUpRequest signUpRequest) {
    User user =
        new User(
            signUpRequest.getUserName(),
            signUpRequest.getEmail(),
            passwordEncoder.encode(signUpRequest.getPassword()));
    Set<String> strRoles = signUpRequest.getRole();
    Role role;
    if (strRoles == null || strRoles.isEmpty()) {
      role =
          roleRepository
              .findByRoleName(AppRole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    } else {
      String roleStr = strRoles.iterator().next();
      if (roleStr.equals("admin")) {
        role =
            roleRepository
                .findByRoleName(AppRole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      } else {
        role =
            roleRepository
                .findByRoleName(AppRole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      }
      user.setAccountNonLocked(true);
      user.setAccountNonExpired(true);
      user.setCredentialsNonExpired(true);
      user.setEnabled(true);
      user.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
      user.setAccountExpiryDate(LocalDate.now().plusYears(1));
      user.setTwoFactorEnabled(false);
      user.setSignUpMethod("email");
    }
    user.setRole(role);
    return userRepository.save(user);
  }
}
