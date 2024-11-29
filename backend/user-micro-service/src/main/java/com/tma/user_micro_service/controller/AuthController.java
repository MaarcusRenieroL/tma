package com.tma.user_micro_service.controller;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
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

    if (signInRequest.getUsername().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Username should not be empty", request, LocalDateTime.now());
    }

    if (signInRequest.getPassword().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Password should not be empty", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Successfully authenticated",
        authService.signIn(signInRequest),
        request,
        LocalDateTime.now());
  }

  @PostMapping("/sign-up")
  public ResponseEntity<StandardResponse<User>> signUp(
      @RequestBody SignUpRequest signUpRequest, HttpServletRequest request) {
    try {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "User created successfully",
          authService.signUp(signUpRequest),
          request,
          LocalDateTime.now());
    } catch (IllegalArgumentException ex) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, ex.getMessage(), request, LocalDateTime.now());
    } catch (RuntimeException ex) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), request, LocalDateTime.now());
    }
  }

  @PostMapping("/forgot-password")
  public void forgotPassword(
      @RequestBody ForgotPasswordRequest forgotPasswordRequest, HttpServletRequest request) {
    authService.forgotPassword(forgotPasswordRequest);
  }
}
