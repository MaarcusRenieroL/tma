package com.tma.user_micro_service.feign;


import com.tma.user_micro_service.dto.TeamDto;

import com.tma.user_micro_service.payload.response.StandardResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient("TEAM-MICRO-SERVICE")
public interface TeamFeignClient {
	@GetMapping("/api/team/{id}")
	public ResponseEntity<StandardResponse<TeamDto>> getTeamById(UUID teamId );
	
	@GetMapping("/api/team/users/{id}")
	public List<UUID> getUsersByTeamId(@PathVariable UUID teamId);
	
}
