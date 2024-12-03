package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.feign.TeamFeignClient;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.UserService;
import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

  private final UserRepository userRepository;
  private final TeamFeignClient teamFeignClient;

  public UserServiceImplementation(UserRepository userRepository, TeamFeignClient teamFeignClient) {
    this.teamFeignClient = teamFeignClient;
    this.userRepository = userRepository;
  }

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public User updateUser(UUID userId, User user) {
    if (!userRepository.existsById(userId)) {
      return null;
    }

    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isPresent()) {
      User existingUser = optionalUser.get();
      existingUser.setName(user.getName());
      existingUser.setRole(user.getRole());
      existingUser.setEmail(user.getEmail());
      existingUser.setLocation(user.getLocation());
      existingUser.setPassword(user.getPassword());

      userRepository.save(existingUser);

      return existingUser;
    }

    return null;
  }

  public void deleteUser(UUID userId) {
    userRepository.deleteById(userId);
  }

  public User getUserById(UUID userId) {
    return userRepository.findById(userId).orElse(null);
  }

  @Override
  public List<User> getAllUsersByIds(List<UUID> userIds) {
    List<User> users = new ArrayList<>();
    for (UUID id : userIds) {
      users.add(userRepository.findById(id).get());
    }
    return users;
  }

  @Override
  public ResponseEntity<StandardResponse<TeamDto>> getTeamDetails(UUID teamId) {
    return teamFeignClient.getTeamById(teamId);
  }

  @Override
  public List<UUID> getUsersInTeam(UUID teamId) {
    return teamFeignClient.getUsersByTeamId(teamId);
  }

  public Object addUserToTeam(UUID teamId, UUID userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return null;
    }

    User existingUser = optionalUser.get();

    Set<UUID> teamIds = new HashSet<>();

    teamIds.add(teamId);

    existingUser.setTeamIds(teamIds);

    userRepository.save(existingUser);

    return "User has been added to the team successfully";
  }
}
