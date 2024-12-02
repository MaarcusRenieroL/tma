package com.tma.user_micro_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {
 
  private UUID teamId;
  private String teamName;
  private String teamDescription;

  private List<UUID> userIds;

  
  private List<UUID>taskIds;


  private List<UUID> ProjectIds;
  
}
