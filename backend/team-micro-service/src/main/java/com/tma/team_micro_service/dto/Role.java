package com.tma.team_micro_service.dto;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;

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
