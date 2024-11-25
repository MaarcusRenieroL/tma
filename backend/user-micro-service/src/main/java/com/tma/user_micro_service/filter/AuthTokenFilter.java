package com.tma.user_micro_service.filter;

import com.tma.user_micro_service.service.implementation.UserDetailsServiceImplementation;
import com.tma.user_micro_service.util.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class AuthTokenFilter extends OncePerRequestFilter {
  private final JwtUtils jwtUtils;
  private final UserDetailsServiceImplementation userDetailsServiceImplementation;

  @Autowired
  public AuthTokenFilter(
      JwtUtils jwtUtils, UserDetailsServiceImplementation userDetailsServiceImplementation) {
    this.jwtUtils = jwtUtils;
    this.userDetailsServiceImplementation = userDetailsServiceImplementation;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      log.info("Inside do filter internal");
      String jwt = jwtUtils.getJwtFromHeader(request);

      log.info("JWT: {}", jwt);
      if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
        String username = jwtUtils.getUsernameFromJWTToken(jwt);
        UserDetails userDetails = userDetailsServiceImplementation.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("Username: {}", username);
        log.info("JWT: {}", jwt);
      }
    } catch (Exception e) {
      System.out.println("Cannot set user authentication: " + e.getMessage());
    }
    filterChain.doFilter(request, response);
  }
}
