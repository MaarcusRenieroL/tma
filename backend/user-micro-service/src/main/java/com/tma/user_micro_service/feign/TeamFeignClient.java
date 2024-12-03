package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.payload.response.StandardResponse;

import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;


@FeignClient(value = "TEAM-MICRO-SERVICE", path = "/api/teams")
public interface TeamFeignClient {
	@GetMapping("/{id}")
	public ResponseEntity<StandardResponse<TeamDto>> getTeamById(UUID teamId );
	
	@GetMapping("/users/{id}")
	Set<UUID> getUsersByTeamId(@PathVariable UUID teamId);
	
//	@PutMapping("/removeUser/{teamId}")
//	void removeUserFromTeam(@PathVariable UUID teamId,@RequestBody UUID userId);
}
