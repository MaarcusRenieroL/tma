package com.tma.user_micro_service.payload.response;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponse {

  private UUID userId;

  private String username;

  private String email;

  private String token;

  private List<String> roles;

  private boolean isOnboarded;

  private boolean isVerified;
}
