package com.tma.user_micro_service.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tma.user_micro_service.payload.response.StandardResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException authException)
      throws IOException, ServletException {

    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    ObjectMapper mapper = new ObjectMapper();
    mapper.writeValue(
        response.getOutputStream(),
        new StandardResponse<>(
            HttpStatus.UNAUTHORIZED,
            HttpServletResponse.SC_UNAUTHORIZED,
            authException.getMessage(),
            LocalDateTime.now(),
            request.getServletPath(),
            null));
  }
}
