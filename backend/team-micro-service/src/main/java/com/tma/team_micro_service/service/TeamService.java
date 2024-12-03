package com.tma.team_micro_service.service;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.model.Team;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TeamService {
  Team createTeam(Team team, UUID userId, HttpServletRequest request);

  Team getTeamById(UUID teamId);

  List<Team> getAllTeams();

  Team updateTeam(UUID teamId, Team team);

  void deleteTeam(UUID teamId);

  List<User> getAllUsersByIds(List<UUID> userIds);

  Set<UUID> getUserByTeamId(UUID teamId);
  
  Set<UUID> getTeamsByUserId(UUID userId);
  
}
