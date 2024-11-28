package com.tma.team_micro_service.service;

import com.tma.team_micro_service.model.Team;
import java.util.List;
import java.util.UUID;

public interface TeamService {
  Team createTeam(Team team);

  Team getTeamById(UUID teamId);

  List<Team> getAllTeams();

  Team updateTeam(UUID teamId, Team team);

  void deleteTeam(UUID teamId);
}
