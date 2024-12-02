package com.tma.user_micro_service.service;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface UserService {

  List<User> getAllUsers();

  User createUser(User user);

  User updateUser(UUID userId, User user);

  void deleteUser(UUID userId);

  User getUserById(UUID userId);
  
  List<User> getAllUsersByIds(List<UUID> userIds);
  
  ResponseEntity<StandardResponse<TeamDto>> getTeamDetails(UUID teamId);
  
  List<UUID> getUsersInTeam(UUID teamId) ;
}

