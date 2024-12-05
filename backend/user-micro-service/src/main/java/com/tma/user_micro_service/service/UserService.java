package com.tma.user_micro_service.service;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

public interface UserService {

  List<User> getAllUsers();

  User createUser(User user);

  User updateUser(UUID userId, User user);

  void deleteUser(UUID userId);

  User getUserById(UUID userId);

  List<UserResponse> getAllUsersByIds(List<UUID> userIds);

  //  ResponseEntity<StandardResponse<TeamDto>> getTeamDetails(UUID teamId);

  Set<UUID> getUsersInTeam(UUID teamId);

  Object addUserToTeam(UUID teamId, UUID userId);

  List<TeamDto> getTeamsByUserId(UUID userId, HttpServletRequest request);

  Object removeUserFromTeam(UUID teamId, UUID userId);

  Object addTaskToUser(UUID taskId, UUID userId);
  List<User> getUsersByProjectId(UUID projectId);

  ResponseEntity<StandardResponse<User>> updateUserOrganizationId(UUID userId,
      UUID updateUserOrganizationIdRequest, HttpServletRequest request);
  
  Object assignProjectToUser(UUID projectId, UUID userId);
}

