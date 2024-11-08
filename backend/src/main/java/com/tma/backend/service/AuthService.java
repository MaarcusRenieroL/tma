package com.tma.backend.service;

import com.tma.backend.model.User;
import com.tma.backend.payload.request.LoginRequest;
import com.tma.backend.payload.request.SignUpRequest;
import com.tma.backend.payload.response.LoginResponse;

public interface AuthService {
  LoginResponse authenticateUser(LoginRequest loginRequest);

  User registerUser(SignUpRequest signUpRequest);
}
