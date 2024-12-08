package com.tma.user_micro_service.payload.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
  private UUID userId;
  private String username;
  private String name;
  private String email;
  private String location;
  private String role;
  private UUID organizationId;
}
