package com.tma.user_micro_service.dto;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {

  private UUID teamId;
  private String teamName;
  private String teamDescription;

  private Set<UUID> userIds;

  private List<UUID> taskIds;

  private List<UUID> ProjectIds;
}
