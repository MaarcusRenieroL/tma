package com.tma.team_micro_service.service;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.team_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TeamService {
  
  ResponseEntity<StandardResponse<Team>> createTeam(Team team, UUID userId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Team>> getTeamById(UUID teamId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<List<Team>>> getAllTeams(HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Team>> updateTeam(UUID teamId, Team team, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Team>> deleteTeam(UUID teamId, UUID userId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<List<User>>> getAllUsersByIds(List<UUID> userIds, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Set<UUID>>> getUserByTeamId(UUID teamId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Object>> assignProjectToTeam(AssignProjectToTeamRequest assignProjectToTeamRequest, HttpServletRequest request);
}
