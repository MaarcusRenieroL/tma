package com.tma.user_micro_service.service;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.ForgotPasswordRequest;
import com.tma.user_micro_service.payload.request.SignInRequest;
import com.tma.user_micro_service.payload.request.SignUpRequest;
import com.tma.user_micro_service.payload.response.SignInResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;

public interface AuthService {

  SignInResponse signIn(SignInRequest signInRequest);

  User signUp(SignUpRequest signUpRequest);

  void signOut();

  CsrfToken generateCsrfToken(HttpServletRequest request);

  void forgotPassword(ForgotPasswordRequest forgotPasswordRequest);
}
