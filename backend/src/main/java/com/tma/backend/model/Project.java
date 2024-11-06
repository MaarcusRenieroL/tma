package com.tma.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID projectId;

  private String projectTitle;

  private String projectDescription;

  @ManyToOne
  @JoinColumn(name = "teamId")
  @JsonIgnore
  private Team team;
}
