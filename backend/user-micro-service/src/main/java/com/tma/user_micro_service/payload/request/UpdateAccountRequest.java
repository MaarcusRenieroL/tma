package com.tma.user_micro_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAccountRequest {
  private String username;
  private String name;
  private String location;
  private String password;
  private String confirmPassword;
}
