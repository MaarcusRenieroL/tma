package com.tma.team_micro_service.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Team {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID teamId;

  private String teamName;
  private String teamDescription;
  
  @ElementCollection
  private List<UUID> userIds;
  
  @ElementCollection
  private List<UUID>taskIds;
  
  @ElementCollection
  private List<UUID> ProjectIds;
  
}
