







package com.tma.user_micro_service.service;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;

public interface AuthService {
  
  ResponseEntity<StandardResponse<SignInResponse>> signIn(SignInRequest signInRequest, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<User>> signUp(SignUpRequest signUpRequest, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<CsrfToken>> generateCsrfToken(HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Void>> forgotPassword(ForgotPasswordRequest forgotPasswordRequest, HttpServletRequest request);
}

