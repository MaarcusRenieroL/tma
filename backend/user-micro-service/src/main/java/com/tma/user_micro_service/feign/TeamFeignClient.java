package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.payload.response.StandardResponse;

import java.util.List;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@FeignClient(value = "team-micro-service", path = "/api/teams")
public interface TeamFeignClient {
	@GetMapping("/{id}")
	StandardResponse<TeamDto> getTeamById(@PathVariable UUID id);
	
	@GetMapping("/users/{id}")
	Set<UUID> getUsersByTeamId(@PathVariable UUID teamId);
	
	@GetMapping("/{id}")
	StandardResponse<TeamDto> getTeamById(@PathVariable UUID id, @RequestHeader("Authorization") String authToken);
	
}
