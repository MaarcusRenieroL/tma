package com.tma.user_micro_service.payload.request;

import lombok.Data;

@Data
public class SignInRequest {
  private String username;
  private String password;
}
