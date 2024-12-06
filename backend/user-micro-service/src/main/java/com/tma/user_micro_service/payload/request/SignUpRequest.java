package com.tma.user_micro_service.payload.request;

import lombok.Data;

@Data
public class SignUpRequest {
  private String username;

  private String email;

  private String password;

  private String confirmPassword;
}
