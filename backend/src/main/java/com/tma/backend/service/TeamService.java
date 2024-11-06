package com.tma.backend.service;

import com.tma.backend.model.Team;
import com.tma.backend.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamService {
  Team createTeam(UUID userId, Team team);

  Optional<Team> getTeamById(UUID teamId);

  List<Team> getAllTeams();

  Team updateTeam(UUID teamId, Team team);

  void deleteTeam(UUID teamId);

  User addUserToTeam(UUID teamId, UUID userId);

  User removeUserFromTeam(UUID teamId, UUID userId);
}
