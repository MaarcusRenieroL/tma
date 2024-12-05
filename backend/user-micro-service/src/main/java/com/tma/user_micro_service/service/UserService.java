package com.tma.user_micro_service.service;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface UserService {
	
	ResponseEntity<StandardResponse<List<User>>> getAllUsers(HttpServletRequest request);
	
	ResponseEntity<StandardResponse<User>> createUser(User user, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<User>> updateUser(UUID userId, User user, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<User>> deleteUser(UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<User>> getUserById(UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<List<UserResponse>>> getAllUsersByIds(List<UUID> userIds, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<Set<UUID>>> getUsersInTeam(UUID teamId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<Object>> addUserToTeam(UUID teamId, UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<List<TeamDto>>> getTeamsByUserId(UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<Object>> removeUserFromTeam(UUID teamId, UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<Object>> addTaskToUser(UUID taskId, UUID userId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<List<User>>> getUsersByProjectId(UUID projectId, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<User>> updateUserOrganizationId(UUID userId, UUID updateUserOrganizationIdRequest, HttpServletRequest request);
	
	ResponseEntity<StandardResponse<Object>> assignProjectToUser(UUID projectId, UUID userId, HttpServletRequest request);
}

