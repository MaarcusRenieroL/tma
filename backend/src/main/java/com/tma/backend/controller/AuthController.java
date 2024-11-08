package com.tma.backend.controller;

import com.tma.backend.model.User;
import com.tma.backend.payload.request.LoginRequest;
import com.tma.backend.payload.request.SignUpRequest;
import com.tma.backend.payload.response.LoginResponse;
import com.tma.backend.payload.response.StandardResponse;
import com.tma.backend.service.AuthService;
import com.tma.backend.service.UserService;
import com.tma.backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth/")
public class AuthController {

  @Autowired private AuthService authService;
  @Autowired private UserService userService;

  @GetMapping("csrf-token")
  public CsrfToken getCsrfToken(HttpServletRequest request) {
    return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
  }

  @PostMapping("/sign-up")
  public ResponseEntity<StandardResponse<User>> registerUser(
      @Valid @RequestBody SignUpRequest signUpRequest, HttpServletRequest request) {
    if (signUpRequest.getUsername() == null
        || signUpRequest.getPassword() == null
        || signUpRequest.getEmail() == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    if (userService.findByUsername(signUpRequest.getUsername()).isPresent()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Username already exists", request, LocalDateTime.now());
    }

    if (userService.findByEmail(signUpRequest.getEmail()).isPresent()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Email already exists", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.CREATED,
        "User created successfully",
        authService.registerUser(signUpRequest),
        request,
        LocalDateTime.now());
  }

  @PostMapping("/sign-in")
  public ResponseEntity<StandardResponse<LoginResponse>> authenticateUser(
      @RequestBody LoginRequest loginRequest, HttpServletRequest request) {

    try {
      LoginResponse loginResponse = authService.authenticateUser(loginRequest);
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Authentication Successful",
          loginResponse,
          request,
          LocalDateTime.now());
    } catch (AuthenticationException exception) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Bad Credentials", request, LocalDateTime.now());
    }
  }
}
