package com.tma.team_micro_service.service.implementation;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.feign.UserFeignClient;
import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.team_micro_service.payload.response.StandardResponse;
import com.tma.team_micro_service.repository.TeamRepository;
import com.tma.team_micro_service.service.TeamService;
import com.tma.team_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<StandardResponse<Team>> createTeam(
      Team team, UUID userId, HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.UNAUTHORIZED,
          "Authorization token is missing or invalid",
          request,
          LocalDateTime.now());
    }

    if (team == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Team and userId cannot be null", request, LocalDateTime.now());
    }

    try {
      Set<UUID> userIds = new HashSet<>();
      userIds.add(userId);
      team.setUserIds(userIds);

      Team savedTeam = teamRepository.save(team);

      userFeignClient.addTeamToUser(savedTeam.getTeamId(), userId, bearerToken);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED, "Team created successfully", savedTeam, request, LocalDateTime.now());
    } catch (Exception e) {
      log.error("Error occurred while creating the team: {}", e.getMessage());
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error creating team: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<Team>> getTeamById(
      UUID teamId, HttpServletRequest request) {
    if (teamId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Team ID cannot be null", request, LocalDateTime.now());
    }

    Team team = teamRepository.findById(teamId).orElse(null);
    if (team == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found with ID: " + teamId, request, LocalDateTime.now());
    }
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team retrieved successfully", team, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<Team>>> getAllTeams(HttpServletRequest request) {
    List<Team> teams = teamRepository.findAll();

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "All teams retrieved successfully", teams, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Team>> updateTeam(
      UUID teamId, Team team, HttpServletRequest request) {
    if (teamId == null || team == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Team ID and team details cannot be null",
          request,
          LocalDateTime.now());
    }

    if (!teamRepository.existsById(teamId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found with ID: " + teamId, request, LocalDateTime.now());
    }

    Team existingTeam = teamRepository.findById(teamId).orElse(null);
    if (existingTeam == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found with ID: " + teamId, request, LocalDateTime.now());
    }

    existingTeam.setTeamName(team.getTeamName());
    existingTeam.setTeamDescription(team.getTeamDescription());

    Team updatedTeam = teamRepository.save(existingTeam);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Team updated successfully", updatedTeam, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Team>> deleteTeam(
      UUID teamId, UUID userId, HttpServletRequest request) {
    if (teamId == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Team ID and User ID cannot be null",
          request,
          LocalDateTime.now());
    }
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.UNAUTHORIZED,
          "Authorization token is missing or invalid",
          request,
          LocalDateTime.now());
    }

    if (!teamRepository.existsById(teamId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Team not found with ID: " + teamId, request, LocalDateTime.now());
    }

    try {
      teamRepository.deleteById(teamId);

      userFeignClient.removeUserFromTeam(userId, teamId, bearerToken);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Team deleted successfully and user updated",
          null,
          request,
          LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the team: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<List<User>>> getAllUsersByIds(
      List<UUID> userIds, HttpServletRequest request) {

    if (userIds == null || userIds.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "User IDs cannot be null", request, LocalDateTime.now());
    }
    try {
      List<User> users = userFeignClient.getAllUsersByIds(userIds);

      // Check if the response is successful
      if (users != null) {
        return ResponseUtil.buildSuccessMessage(
            HttpStatus.OK, "Users retrieved successfully", users, request, LocalDateTime.now());
      }

      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Failed to retrieve users", request, LocalDateTime.now());

    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error fetching users: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<Set<UUID>>> getUserByTeamId(
      UUID teamId, HttpServletRequest request) {
    if (teamId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Team ID cannot be null", request, LocalDateTime.now());
    }
    try {
      Team team =
          teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team Not Found"));
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "User IDs retrieved successfully for the team",
          team.getUserIds(),
          request,
          LocalDateTime.now());
    } catch (RuntimeException e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, e.getMessage(), request, LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error fetching user IDs: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  public ResponseEntity<StandardResponse<Object>> assignProjectToTeam(
      AssignProjectToTeamRequest assignProjectToTeamRequest, HttpServletRequest request) {
    if (assignProjectToTeamRequest == null
        || assignProjectToTeamRequest.getTeamId() == null
        || assignProjectToTeamRequest.getProjectId() == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Missing required fields: teamId or projectId",
          request,
          LocalDateTime.now());
    }
    try {

      Team existingTeam =
          teamRepository
              .findById(assignProjectToTeamRequest.getTeamId())
              .orElseThrow(() -> new RuntimeException("Team not found"));

      if (existingTeam.getProjectIds() == null) {
        Set<UUID> projectIds = new HashSet<>();
      }
      existingTeam.getProjectIds().add(assignProjectToTeamRequest.getProjectId());
      teamRepository.save(existingTeam);
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Project successfully assigned to the team",
          null,
          request,
          LocalDateTime.now());
    } catch (RuntimeException e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, e.getMessage(), request, LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error assigning project to the team: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }
}
