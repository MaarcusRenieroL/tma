package com.tma.backend.config;

import static org.springframework.security.config.Customizer.withDefaults;

import com.tma.backend.filter.RequestValidationFilter;
import com.tma.backend.model.AppRole;
import com.tma.backend.model.Role;
import com.tma.backend.repository.RoleRepository;
import com.tma.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class SecurityConfig {

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
        (requests) ->
            requests.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated());
    // http.formLogin(withDefaults());
    http.csrf(AbstractHttpConfigurer::disable);
    http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()));
    http.addFilterAfter(new RequestValidationFilter(), UsernamePasswordAuthenticationFilter.class);
    http.sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    http.httpBasic(withDefaults());
    return http.build();
  }

  @Bean
  CommandLineRunner initData(
      RoleRepository roleRepository,
      UserRepository userRepository,
      PasswordEncoder passwordEncoder) {
    return args -> {
      roleRepository
          .findByRoleName(AppRole.ROLE_USER)
          .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

      roleRepository
          .findByRoleName(AppRole.ROLE_ADMIN)
          .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));
    };
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
