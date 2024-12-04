package com.tma.team_micro_service.payload.request;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteTeamRequest {
  private UUID teamId;
  private UUID userId;
}
