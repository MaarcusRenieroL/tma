package com.tma.user_micro_service.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.tma.user_micro_service.filter.AuthTokenFilter;
import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.util.JwtUtils;
import com.tma.user_micro_service.util.Utilities;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final UserDetailsService userDetailsService;
  private final AuthTokenFilter authTokenFilter;
  private final JwtUtils jwtUtils;

  public SecurityConfig(
      UserDetailsService userDetailsService, AuthTokenFilter authTokenFilter, JwtUtils jwtUtils) {
    this.userDetailsService = userDetailsService;
    this.authTokenFilter = authTokenFilter;
    this.jwtUtils = jwtUtils;
  }

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

    http.csrf(AbstractHttpConfigurer::disable);
    http.authorizeHttpRequests(
        requests ->
            requests
                .requestMatchers(
                    "/api/auth/**",
                    "/api/users/verify-organization-account/**",
                    "/api/users/setup-account/**")
                .permitAll()
                .requestMatchers("/error")
                .permitAll()
                .anyRequest()
                .authenticated());
    http.httpBasic(withDefaults());

    http.addFilterAfter(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public AuthenticationProvider getAuthenticationProvider() {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
    authenticationProvider.setUserDetailsService(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder());
    return authenticationProvider;
  }

  @Bean
  CommandLineRunner initData(
      RoleRepository roleRepository,
      UserRepository userRepository,
      PasswordEncoder passwordEncoder) {
    return args -> {
      Role systemAdminRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_SYSTEM_ADMIN)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_SYSTEM_ADMIN)));
      Role adminRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_ADMIN)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));
      Role teamLeadRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_TEAM_LEAD)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_TEAM_LEAD)));
      Role projectManagerRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_PROJECT_MANAGER)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_PROJECT_MANAGER)));
      Role developerRole =
          roleRepository
              .findByRoleName(AppRole.ROLE_DEVELOPER)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_DEVELOPER)));

      if (userRepository.findByUserName("sa1").isEmpty()) {
        User sa1 =
            new User("sa1", passwordEncoder.encode("asd@123"), "sa1@example.com", "System Admin 1");
        Utilities.setupUser(roleRepository, userRepository, sa1, systemAdminRole.getRoleName());
      }

      if (userRepository.findByUserName("sa2").isEmpty()) {
        User sa2 =
            new User("sa2", passwordEncoder.encode("asd@123"), "sa2@example.com", "System Admin 2");
        Utilities.setupUser(roleRepository, userRepository, sa2, systemAdminRole.getRoleName());
      }

      if (userRepository.findByUserName("ad1").isEmpty()) {
        User ad1 = new User("ad1", passwordEncoder.encode("asd@123"), "ad1@example.com", "Admin 1");
        Utilities.setupUser(roleRepository, userRepository, ad1, adminRole.getRoleName());
      }

      if (userRepository.findByUserName("ad2").isEmpty()) {
        User ad2 = new User("ad2", passwordEncoder.encode("asd@123"), "ad2@example.com", "Admin 2");
        Utilities.setupUser(roleRepository, userRepository, ad2, adminRole.getRoleName());
      }

      if (userRepository.findByUserName("pm1").isEmpty()) {
        User pm1 =
            new User(
                "pm1", passwordEncoder.encode("asd@123"), "pm1@example.com", "Project Manager 1");
        Utilities.setupUser(roleRepository, userRepository, pm1, projectManagerRole.getRoleName());
      }

      if (userRepository.findByUserName("pm2").isEmpty()) {
        User pm2 =
            new User(
                "pm2", passwordEncoder.encode("asd@123"), "pm2@example.com", "Project Manager 2");
        Utilities.setupUser(roleRepository, userRepository, pm2, projectManagerRole.getRoleName());
      }

      if (userRepository.findByUserName("tl1").isEmpty()) {
        User tl1 =
            new User("tl1", passwordEncoder.encode("asd@123"), "tl1@example.com", "Team Lead 1");
        Utilities.setupUser(roleRepository, userRepository, tl1, teamLeadRole.getRoleName());
      }

      if (userRepository.findByUserName("tl2").isEmpty()) {
        User tl2 =
            new User("tl2", passwordEncoder.encode("asd@123"), "tl2@example.com", "Team Lead 2");
        Utilities.setupUser(roleRepository, userRepository, tl2, teamLeadRole.getRoleName());
      }

      if (userRepository.findByUserName("dev1").isEmpty()) {
        User dev1 =
            new User("dev1", passwordEncoder.encode("asd@123"), "dev1@example.com", "Developer 1");
        Utilities.setupUser(roleRepository, userRepository, dev1, developerRole.getRoleName());
      }

      if (userRepository.findByUserName("dev2").isEmpty()) {
        User dev2 =
            new User("dev2", passwordEncoder.encode("asd@123"), "dev2@example.com", "Developer 2");
        Utilities.setupUser(roleRepository, userRepository, dev2, developerRole.getRoleName());
      }
    };
  }
}
