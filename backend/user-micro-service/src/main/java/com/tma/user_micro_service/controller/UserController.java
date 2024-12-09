package com.tma.user_micro_service.controller;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.*;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.service.UserService;
import com.tma.user_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<StandardResponse<List<User>>> getAllUsers(HttpServletRequest request) {
    return userService.getAllUsers(request);
  }

  @PostMapping
  public ResponseEntity<StandardResponse<User>> createUser(
      @RequestBody User user, HttpServletRequest request) {
    return userService.createUser(user, request);
  }

  @PutMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> updateUser(
      @PathVariable UUID userId, @RequestBody UpdateUserRequest user, HttpServletRequest request) {
    return userService.updateUser(userId, user, request);
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> deleteUser(
      @PathVariable UUID userId, HttpServletRequest request) {
    return userService.deleteUser(userId, request);
  }

  @GetMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> getUserById(
      @PathVariable UUID userId, HttpServletRequest request) {
    return userService.getUserById(userId, request);
  }

  @PostMapping("/team/{teamId}")
  ResponseEntity<StandardResponse<Object>> addTeamToUser(
      @PathVariable UUID teamId, @RequestBody UUID userId, HttpServletRequest request) {
    if (teamId == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing Required Fields", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        userService.addUserToTeam(teamId, userId, request).toString(),
        null,
        request,
        LocalDateTime.now());
  }

  @PutMapping("/remove-user/{teamId}/user/{userId}")
  public ResponseEntity<StandardResponse<Object>> removeUserFromTeam(
      @PathVariable UUID teamId, @PathVariable UUID userId, HttpServletRequest request) {
    return userService.removeUserFromTeam(teamId, userId, request);
  }

  @PostMapping("/task/{taskId}")
  ResponseEntity<StandardResponse<Object>> addTaskToUser(
      @PathVariable UUID taskId, @RequestBody UUID userId, HttpServletRequest request) {
    if (taskId == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing Required Fields", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        userService.addTaskToUser(taskId, userId, request).toString(),
        null,
        request,
        LocalDateTime.now());
  }

  @PostMapping("/usersId")
  public ResponseEntity<StandardResponse<List<UserResponse>>> getAllUsersByIds(
      @RequestBody GetAllUsersByUserIdsRequest getAllUsersByUserIdsRequest,
      HttpServletRequest request) {

    return userService.getAllUsersByIds(getAllUsersByUserIdsRequest.getUserIds(), request);
  }

  @GetMapping("/get-teams/{userId}")
  public ResponseEntity<StandardResponse<List<TeamDto>>> getTeamsByUserId(
      @PathVariable UUID userId, HttpServletRequest request) {
    return userService.getTeamsByUserId(userId, request);
  }

  @GetMapping("project/{projectId}")
  public ResponseEntity<StandardResponse<List<User>>> getUsersByProjectId(
      @PathVariable UUID projectId, HttpServletRequest request) {
    return userService.getUsersByProjectId(projectId, request);
  }

  @PutMapping("/{userId}/organization")
  public ResponseEntity<StandardResponse<User>> updateUserOrganizationId(
      @PathVariable UUID userId,
      @RequestBody UpdateUserOrganizationRequest updateUserOrganizationIdRequest,
      HttpServletRequest request) {
    return userService.updateUserOrganizationId(
        userId, updateUserOrganizationIdRequest.getOrganizationId(), request);
  }

  @PutMapping("/project")
  ResponseEntity<StandardResponse<Object>> assignProjectToUsers(
      @RequestBody AssignProjectToUsersRequest projectToUserRequest, HttpServletRequest request) {
    try {

      return userService.assignProjectToUsers(
          projectToUserRequest.getProjectId(), projectToUserRequest.getUserIds(), request);
    } catch (Exception e) {
      log.error(
          "Error in assignProjectToUser. Error type: {}, Message: {}",
          e.getClass().getName(),
          e.getMessage());
      e.printStackTrace();
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while assigning project to user: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  @GetMapping("/organization/{organizationId}")
  ResponseEntity<StandardResponse<List<UserResponse>>> getUsersByOrganizationId(
      @PathVariable UUID organizationId, HttpServletRequest request) {
    return userService.getUsersByOrganizationId(organizationId, request);
  }

  @PostMapping("/organization/{organizationId}")
  ResponseEntity<StandardResponse<Object>> inviteUsersToOrganization(
      @PathVariable UUID organizationId,
      @RequestBody InviteUsersToOrganizationRequest inviteUsersToOrganizationRequest,
      HttpServletRequest request) {
    return userService.inviteUsersToOrganization(inviteUsersToOrganizationRequest, request);
  }

  @PutMapping("/change-password")
  ResponseEntity<StandardResponse<Boolean>> changePassword(
      @RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest request) {
    return userService.changePassword(changePasswordRequest, request);
  }

  @PostMapping("/verify-organization-account")
  ResponseEntity<StandardResponse<Object>> verifyOrganizationAccount(
      @RequestBody SetupAccountRequest verifyOrganizationAccountRequest,
      HttpServletRequest request) {
    return userService.verifyOrganizationAccount(verifyOrganizationAccountRequest, request);
  }

  @PostMapping("/setup-account/{userId}")
  ResponseEntity<StandardResponse<Object>> setupAccount(
      @PathVariable UUID userId,
      @RequestBody UpdateAccountRequest updateAccountRequest,
      HttpServletRequest request) {
    return userService.setupAccount(userId, updateAccountRequest, request);
  }
}
