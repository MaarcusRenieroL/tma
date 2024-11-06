package com.tma.backend.controller;

import com.tma.backend.model.Team;
import com.tma.backend.model.User;
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
@RequestMapping("/api/team")
public class TeamController {

  @Autowired private TeamService teamService;

  @GetMapping
  public ResponseEntity<StandardResponse<List<Team>>> getAllTeams(HttpServletRequest request) {
    List<Team> teams = teamService.getAllTeams();

    if (teams.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No teams found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Teams retrieved successfully", teams, request, LocalDateTime.now());
  }

  @GetMapping("/{teamId}")
  public ResponseEntity<StandardResponse<Team>> getTeamById(
      @PathVariable UUID teamId, HttpServletRequest request) {
    Team team = teamService.getTeamById(teamId);

    if (team == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team retrieved successfully", team, request, LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Team>> createTeam(
      @RequestParam UUID userId, @RequestBody Team team, HttpServletRequest request) {
    try {
      if (team.getTeamName() == null || team.getTeamDescription() == null || userId == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      Team createdTeam = teamService.createTeam(userId, team);

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

  @PutMapping("/{teamId}")
  public ResponseEntity<StandardResponse<Team>> updateTeam(
      @PathVariable UUID teamId, @RequestBody Team team, HttpServletRequest request) {

    Team updatedTeam = teamService.updateTeam(teamId, team);

    if (updatedTeam == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found for update", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team updated successfully", updatedTeam, request, LocalDateTime.now());
  }

  @DeleteMapping("/{teamId}")
  public ResponseEntity<StandardResponse<Team>> deleteTeam(
      @PathVariable UUID teamId, HttpServletRequest request) {
    try {
      if (teamService.getTeamById(teamId) == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "Team not found with ID: " + teamId,
            request,
            LocalDateTime.now());
      }

      teamService.deleteTeam(teamId);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "Team deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the team",
          request,
          LocalDateTime.now());
    }
  }

  @PostMapping("/{teamId}/users/{userId}")
  public ResponseEntity<StandardResponse<User>> addUserToTeam(
      @PathVariable UUID teamId, @PathVariable UUID userId, HttpServletRequest request) {

    User updatedUser = teamService.addUserToTeam(teamId, userId);

    if (updatedUser != null) {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "User added to team successfully",
          updatedUser,
          request,
          LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND,
        "Failed to add user to team. Team or User not found",
        request,
        LocalDateTime.now());
  }

  @DeleteMapping("/{teamId}/users/{userId}")
  public ResponseEntity<StandardResponse<User>> removeUserFromTeam(
      @PathVariable UUID teamId, @PathVariable UUID userId, HttpServletRequest request) {

    User updatedUser = teamService.removeUserFromTeam(teamId, userId);

    if (updatedUser != null) {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "User removed from team successfully",
          updatedUser,
          request,
          LocalDateTime.now());
    }
    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND,
        "Failed to remove user from team. Team or User not found",
        request,
        LocalDateTime.now());
  }
}
