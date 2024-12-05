package com.tma.project_micro_service.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID projectId;

  private String projectTitle;
  private String projectDescription;

  private UUID teamId;

  @ElementCollection private List<UUID> taskIds;

  @ElementCollection private Set<UUID> UserIds;
}
