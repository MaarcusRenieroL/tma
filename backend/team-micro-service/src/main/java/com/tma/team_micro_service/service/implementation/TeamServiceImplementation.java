package com.tma.team_micro_service.service.implementation;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.feign.UserFeignClient;
import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.repository.TeamRepository;
import com.tma.team_micro_service.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TeamServiceImplementation implements TeamService {
  private final UserFeignClient userFeignClient;
  private final TeamRepository teamRepository;

  public TeamServiceImplementation(UserFeignClient userFeignClient, TeamRepository teamRepository) {
    this.userFeignClient = userFeignClient;
    this.teamRepository = teamRepository;
  }

  @Override
  public Team createTeam(Team team, UUID userId, HttpServletRequest request) {

    log.info("Inside service code");

    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {

      log.info("Inside bearer token check");

      Set<UUID> userIds = new HashSet<>();

      userIds.add(userId);

      team.setUserIds(userIds);

      Team savedTeam = teamRepository.save(team);

      log.info("Saved team and calling user feign client to add team id to user");
      
      
      log.info("INside create team function");
      
      log.info("Team Id: {}", savedTeam.getTeamId());
      log.info("User Id: {}", userId);

      userFeignClient.addTeamToUser(savedTeam.getTeamId(), userId, bearerToken);
      
      log.info("After feign client call");
      
      log.info("Team Id: {}", savedTeam.getTeamId());
      log.info("User Id: {}", userId);
      
      log.info("Success");

      return savedTeam;
    }

    return null;
  }

  @Override
  public Team getTeamById(UUID teamId) {
    return teamRepository.findById(teamId).orElse(null);
  }

  @Override
  public List<Team> getAllTeams() {
    return teamRepository.findAll();
  }

  @Override
  public Team updateTeam(UUID teamId, Team team) {
    if (!teamRepository.existsById(teamId)) {
      return null;
    }

    Optional<Team> optionalTeam = teamRepository.findById(teamId);

    if (optionalTeam.isPresent()) {
      Team existingTeam = optionalTeam.get();
      existingTeam.setTeamName(team.getTeamName());
      existingTeam.setTeamDescription(team.getTeamDescription());
      teamRepository.save(existingTeam);

      return existingTeam;
    }

    return null;
  }

  @Override
  public void deleteTeam(UUID teamId, UUID userId, HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      teamRepository.deleteById(teamId);
      userFeignClient.removeUserFromTeam(userId, teamId, bearerToken);
    }
  }

  @Override
  public List<User> getAllUsersByIds(List<UUID> userIds) {
    return userFeignClient.getAllUsersByIds(userIds);
  }

  @Override
  public Set<UUID> getUserByTeamId(UUID teamId) {
    Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team Not Found"));

    return team.getUserIds();
  }
}
