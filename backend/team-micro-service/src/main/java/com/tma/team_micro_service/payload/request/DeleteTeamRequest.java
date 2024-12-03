package com.tma.team_micro_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteTeamRequest {
	private UUID teamId;
	private UUID userId;
}
