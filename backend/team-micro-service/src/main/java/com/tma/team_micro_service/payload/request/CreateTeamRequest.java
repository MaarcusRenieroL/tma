package com.tma.team_micro_service.payload.request;

import com.tma.team_micro_service.model.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTeamRequest {
	private Team team;
	private UUID userId;
}
