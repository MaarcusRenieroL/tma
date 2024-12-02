package com.tma.team_micro_service.service;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface TeamService {
  Team createTeam(Team team);

  Team getTeamById(UUID teamId);

  List<Team> getAllTeams();

  Team updateTeam(UUID teamId, Team team);

  void deleteTeam(UUID teamId);
  
  List<User> getAllUsersByIds(List<UUID> userIds);
  
  
  
  List<UUID> getUserByTeamId(UUID teamId);
  
}
