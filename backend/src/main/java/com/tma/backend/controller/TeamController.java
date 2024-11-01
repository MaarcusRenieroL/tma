package com.tma.backend.controller;

import com.tma.backend.model.Team;
import com.tma.backend.payload.response.StandardResponse;
import com.tma.backend.service.TeamService;
import com.tma.backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/team") // Adjusted to match the project structure
public class TeamController {

  @Autowired private TeamService teamService;
  @Autowired private ResponseUtil<Team> responseUtil;

  @GetMapping("/")
  public ResponseEntity<StandardResponse<List<Team>>> getAllTeams(HttpServletRequest request) {
    List<Team> teams = teamService.getAllTeams();

    if (teams.isEmpty()) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No teams found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Teams retrieved successfully", teams, request, LocalDateTime.now());
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> getTeamById(
      @PathVariable UUID id, HttpServletRequest request) {
    Team team = teamService.getTeamById(id);

    if (team == null) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team retrieved successfully", team, request, LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Team>> createTeam(
      @RequestBody Team team, HttpServletRequest request) {
    Team createdTeam = teamService.createTeam(team);

    return responseUtil.buildSuccessMessage(
        HttpStatus.CREATED, "Team created successfully", createdTeam, request, LocalDateTime.now());
  }

  @PutMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> updateTeam(
      @PathVariable UUID id, @RequestBody Team team, HttpServletRequest request) {
    Team updatedTeam = teamService.updateTeam(id, team);

    if (updatedTeam == null) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found for update", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team updated successfully", updatedTeam, request, LocalDateTime.now());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<StandardResponse<Team>> deleteTeam(
      @PathVariable UUID id, HttpServletRequest request) {
    try {
      if (teamService.getTeamById(id) == null) {
        return responseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "Team not found with ID: " + id, request, LocalDateTime.now());
      }

      teamService.deleteTeam(id);

      return responseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "Team deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {
      return responseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the team",
          request,
          LocalDateTime.now());
    }
  }
}
