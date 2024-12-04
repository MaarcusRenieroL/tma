package com.tma.project_micro_service.feign;

import com.tma.project_micro_service.payload.request.AssignProjectToTeamRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "team-micro-service", path = "api/teams")
public interface TeamFeignClient {
  @PostMapping("/project")
  void assignProjectToTeam(
      @RequestBody AssignProjectToTeamRequest assignProjectToTeamRequest,
      @RequestHeader("Authorization") String authToken);
}
