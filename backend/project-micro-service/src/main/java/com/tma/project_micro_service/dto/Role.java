package com.tma.project_micro_service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
public class Role {

  private UUID roleId;

  private AppRole roleName;

  private Set<User> users = new HashSet<>();

  public Role(AppRole roleName) {
    this.roleName = roleName;
  }
}
