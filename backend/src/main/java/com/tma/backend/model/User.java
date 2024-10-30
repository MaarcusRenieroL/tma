package com.tma.backend.model;

import jakarta.persistence.*;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID userId;

  private String email;

  private String name;

  private String password;

  private String location;

  private Role role;
}
