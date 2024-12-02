package com.tma.team_micro_service.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
