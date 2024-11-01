package com.tma.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID projectId;

  private String projectTitle;

  private String projectDescription;
}
