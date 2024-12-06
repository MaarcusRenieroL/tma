package com.tma.user_micro_service.controller;

import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.service.implementation.AuthServiceImplementation;
import com.tma.user_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final AuthServiceImplementation authService;

  public AuthController(AuthServiceImplementation authService) {
    this.authService = authService;
  }

  @PostMapping("sign-in")
  public ResponseEntity<StandardResponse<SignInResponse>> signIn(
      @RequestBody SignInRequest signInRequest, HttpServletRequest request) {

    return authService.signIn(signInRequest, request);
  }

  @PostMapping("/sign-up")
  public ResponseEntity<StandardResponse<UserResponse>> signUp(
      @RequestBody SignUpRequest signUpRequest, HttpServletRequest request) {
    try {

      System.out.println("Username: " + signUpRequest.getUsername());
      System.out.println("Password: " + signUpRequest.getPassword());
      System.out.println("Email: " + signUpRequest.getEmail());
      System.out.println("Confirm Password: " + signUpRequest.getConfirmPassword());

      return authService.signUp(signUpRequest, request);
    } catch (IllegalArgumentException ex) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, ex.getMessage(), request, LocalDateTime.now());
    } catch (RuntimeException ex) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), request, LocalDateTime.now());
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<StandardResponse<Void>> forgotPassword(
      @RequestBody ForgotPasswordRequest forgotPasswordRequest, HttpServletRequest request) {

    return authService.forgotPassword(forgotPasswordRequest, request);
  }
}
