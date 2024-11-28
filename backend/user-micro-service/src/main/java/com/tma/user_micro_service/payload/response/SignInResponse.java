package com.tma.user_micro_service.payload.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponse {
  private String username;
  private String token;
  private List<String> roles;
}