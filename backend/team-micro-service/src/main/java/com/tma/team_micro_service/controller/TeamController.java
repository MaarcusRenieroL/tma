package com.tma.team_micro_service.controller;

import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.team_micro_service.payload.request.CreateTeamRequest;
import com.tma.team_micro_service.payload.request.DeleteTeamRequest;
import com.tma.team_micro_service.payload.response.StandardResponse;
import com.tma.team_micro_service.service.implementation.TeamServiceImplementation;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/teams")
public class TeamController {

  private final TeamServiceImplementation teamService;

  public TeamController(TeamServiceImplementation teamService) {
    this.teamService = teamService;
  }

  @GetMapping
  public ResponseEntity<StandardResponse<List<Team>>> getAllTeams(HttpServletRequest request) {
    return teamService.getAllTeams(request);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> getTeamById(
      @PathVariable UUID id, HttpServletRequest request) {

    return teamService.getTeamById(id, request);
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Team>> createTeam(
      @RequestBody CreateTeamRequest teamRequest, HttpServletRequest request) {
    return teamService.createTeam(teamRequest.getTeam(), teamRequest.getUserId(), request);
  }

  @PutMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> updateTeam(
      @PathVariable UUID id, @RequestBody Team team, HttpServletRequest request) {

    return teamService.updateTeam(id, team, request);
  }

  @DeleteMapping("/{teamId}")
  public ResponseEntity<StandardResponse<Team>> deleteTeam(
      @PathVariable UUID teamId,
      @RequestBody DeleteTeamRequest deleteTeamRequest,
      HttpServletRequest request) {
    return teamService.deleteTeam(teamId, deleteTeamRequest.getUserId(), request);
  }

  @GetMapping("/users/{teamId}")
  public ResponseEntity<StandardResponse<Set<UUID>>> getUsersByTeamId(
      @PathVariable UUID teamId, HttpServletRequest request) {
    return teamService.getUserByTeamId(teamId, request);
  }

  @PostMapping("/project")
  public void assignProjectToTeam(
      @RequestBody AssignProjectToTeamRequest assignProjectToTeamRequest,
      HttpServletRequest request) {
    teamService.assignProjectToTeam(assignProjectToTeamRequest, request);
  }
}
