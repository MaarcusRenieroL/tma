package com.tma.team_micro_service.service;

import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.repository.TeamRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

  @Autowired private TeamRepository teamRepo;

  @Override
  public Team createTeam(Team team) {
    return teamRepo.save(team);
  }

  @Override
  public Team getTeamById(UUID teamId) {
    return teamRepo.findById(teamId).orElse(null);
  }

  @Override
  public List<Team> getAllTeams() {
    return teamRepo.findAll();
  }

  @Override
  public Team updateTeam(UUID teamId, Team team) {
    if (!teamRepo.existsById(teamId)) {
      return null;
    }

    Optional<Team> optionalTeam = teamRepo.findById(teamId);

    if (optionalTeam.isPresent()) {
      Team existingTeam = optionalTeam.get();
      existingTeam.setTeamName(team.getTeamName());
      existingTeam.setTeamDescription(team.getTeamDescription());
      teamRepo.save(existingTeam);

      return existingTeam;
    }

    return null;
  }

  @Override
  public void deleteTeam(UUID teamId) {

    teamRepo.deleteById(teamId);
  }
}
