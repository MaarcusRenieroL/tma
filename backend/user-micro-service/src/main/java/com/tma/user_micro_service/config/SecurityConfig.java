package com.tma.user_micro_service.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.tma.user_micro_service.filter.RequestValidationFilter;
import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

    http.csrf(
        csrf ->
            csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringRequestMatchers("/api/auth"));
    http.sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    http.httpBasic(withDefaults());
    http.authorizeHttpRequests(
        requests ->
            requests.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated());
    http.addFilterAfter(new RequestValidationFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository) {
    return args -> {
      Role systemAdminRole =
          roleRepository
              .findByRoleName(AppRole.SYSTEM_ADMIN)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.SYSTEM_ADMIN)));
      Role adminRole =
          roleRepository
              .findByRoleName(AppRole.ADMIN)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.ADMIN)));
      Role teamLeadRole =
          roleRepository
              .findByRoleName(AppRole.TEAM_LEAD)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.TEAM_LEAD)));
      Role projectManagerRole =
          roleRepository
              .findByRoleName(AppRole.PROJECT_MANAGER)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.PROJECT_MANAGER)));
      Role developerRole =
          roleRepository
              .findByRoleName(AppRole.DEVELOPER)
              .orElseGet(() -> roleRepository.save(new Role(AppRole.DEVELOPER)));

      if (userRepository.findByUserName("systemAdmin").isEmpty()) {
        User systemAdmin = new User("systemAdmin", "{noop}sysAdminPass", "systemAdmin@example.com");
        systemAdmin.setAccountNonLocked(true);
        systemAdmin.setAccountNonExpired(true);
        systemAdmin.setCredentialsNonExpired(true);
        systemAdmin.setEnabled(true);
        systemAdmin.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
        systemAdmin.setAccountExpiryDate(LocalDate.now().plusYears(1));
        systemAdmin.setTwoFactorEnabled(false);
        systemAdmin.setSignUpMethod("email");
        systemAdmin.setRole(systemAdminRole);
        userRepository.save(systemAdmin);
      }

      if (userRepository.findByUserName("admin").isEmpty()) {
        User admin = new User("admin", "{noop}adminPass", "admin@example.com");
        admin.setAccountNonLocked(true);
        admin.setAccountNonExpired(true);
        admin.setCredentialsNonExpired(true);
        admin.setEnabled(true);
        admin.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
        admin.setAccountExpiryDate(LocalDate.now().plusYears(1));
        admin.setTwoFactorEnabled(false);
        admin.setSignUpMethod("email");
        admin.setRole(adminRole);
        userRepository.save(admin);
      }

      if (userRepository.findByUserName("teamLead").isEmpty()) {
        User teamLead = new User("teamLead", "{noop}teamLeadPass", "teamLead@example.com");
        teamLead.setAccountNonLocked(true);
        teamLead.setAccountNonExpired(true);
        teamLead.setCredentialsNonExpired(true);
        teamLead.setEnabled(true);
        teamLead.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
        teamLead.setAccountExpiryDate(LocalDate.now().plusYears(1));
        teamLead.setTwoFactorEnabled(false);
        teamLead.setSignUpMethod("email");
        teamLead.setRole(teamLeadRole);
        userRepository.save(teamLead);
      }

      if (userRepository.findByUserName("projectManager").isEmpty()) {
        User projectManager =
            new User("projectManager", "{noop}projectLeadPass", "projectManager@example.com");
        projectManager.setAccountNonLocked(true);
        projectManager.setAccountNonExpired(true);
        projectManager.setCredentialsNonExpired(true);
        projectManager.setEnabled(true);
        projectManager.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
        projectManager.setAccountExpiryDate(LocalDate.now().plusYears(1));
        projectManager.setTwoFactorEnabled(false);
        projectManager.setSignUpMethod("email");
        projectManager.setRole(projectManagerRole);
        userRepository.save(projectManager);
      }

      if (userRepository.findByUserName("developer").isEmpty()) {
        User developer = new User("developer", "{noop}developerPass", "developer@example.com");
        developer.setAccountNonLocked(true);
        developer.setAccountNonExpired(true);
        developer.setCredentialsNonExpired(true);
        developer.setEnabled(true);
        developer.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
        developer.setAccountExpiryDate(LocalDate.now().plusYears(1));
        developer.setTwoFactorEnabled(false);
        developer.setSignUpMethod("email");
        developer.setRole(developerRole);
        userRepository.save(developer);
      }
    };
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
