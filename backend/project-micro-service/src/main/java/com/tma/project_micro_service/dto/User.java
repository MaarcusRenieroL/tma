package com.tma.project_micro_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

  private UUID userId;
  private String userName;
  private String email;
  private String password;
  private String name;
  private String location;
  private Role role;
}
