package com.tma.team_micro_service.controller;

import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.payload.request.CreateTeamRequest;
import com.tma.team_micro_service.payload.request.DeleteTeamRequest;
import com.tma.team_micro_service.payload.response.StandardResponse;
import com.tma.team_micro_service.service.implementation.TeamServiceImplementation;
import com.tma.team_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    List<Team> teams = teamService.getAllTeams();

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Teams retrieved successfully", teams, request, LocalDateTime.now());
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> getTeamById(
      @PathVariable UUID id, HttpServletRequest request) {
    Team team = teamService.getTeamById(id);

    if (team == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team retrieved successfully", team, request, LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Team>> createTeam(
      @RequestBody CreateTeamRequest teamRequest, HttpServletRequest request) {

    log.info("Inside team controller");

    try {
      if (teamRequest.getTeam().getTeamName() == null
          || teamRequest.getTeam().getTeamDescription() == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }
      Team createdTeam =
          teamService.createTeam(teamRequest.getTeam(), teamRequest.getUserId(), request);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Team created successfully",
          createdTeam,
          request,
          LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while creating the project",
          request,
          LocalDateTime.now());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> updateTeam(
      @PathVariable UUID id, @RequestBody Team team, HttpServletRequest request) {

    Team updatedTeam = teamService.updateTeam(id, team);

    if (updatedTeam == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found for update", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team updated successfully", updatedTeam, request, LocalDateTime.now());
  }

  @DeleteMapping("/{teamId}")
  public ResponseEntity<StandardResponse<Team>> deleteTeam(
    @PathVariable UUID teamId, @RequestBody DeleteTeamRequest deleteTeamRequest, HttpServletRequest request) {
    
    log.info("Inside delete method");
    
    try {
      
      log.info("Inside try catch block");
      
      if (teamService.getTeamById(teamId) == null || deleteTeamRequest.getUserId() == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "Missing required fields", request, LocalDateTime.now());
      }
      
      log.info("");
      log.info("");
      log.info("");
      log.info("");
      log.info("");
      
      log.info("Team Id: {}", deleteTeamRequest.getTeamId());
      log.info("User Id: {}", deleteTeamRequest.getUserId());

      teamService.deleteTeam(teamId, deleteTeamRequest.getUserId(), request);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "Team deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {
      log.error("e: ", e);
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the team",
          request,
          LocalDateTime.now());
    }
  }
  
  @GetMapping("/users/{teamId}")
  public Set<UUID> getUsersByTeamId(@PathVariable UUID teamId) {
    return teamService.getUserByTeamId(teamId);
  }

}
