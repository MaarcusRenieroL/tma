package com.tma.team_micro_service.payload.request;

import com.tma.team_micro_service.model.Team;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTeamRequest {
  private Team team;
  private UUID userId;
}
