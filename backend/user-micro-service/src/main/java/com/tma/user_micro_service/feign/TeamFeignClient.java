package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.payload.response.StandardResponse;
import java.util.Set;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "team-micro-service", path = "/api/teams")
public interface TeamFeignClient {
  @GetMapping("/{id}")
  StandardResponse<TeamDto> getTeamById(@PathVariable UUID id);

  @GetMapping("/users/{teamId}")
  Set<UUID> getUsersByTeamId(@PathVariable UUID teamId);

  @GetMapping("/{id}")
  StandardResponse<TeamDto> getTeamById(
      @PathVariable UUID id, @RequestHeader("Authorization") String authToken);
}
