package com.tma.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID userId;

  private String name;
  private Role role;
  private String email;
  private String password;
  private String location;

  @ManyToOne
  @JoinColumn(name = "teamId")
  @JsonBackReference
  private Team team;
}
