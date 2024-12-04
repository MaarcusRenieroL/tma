package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.feign.TeamFeignClient;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
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
  public List<UserResponse> getAllUsersByIds(List<UUID> userIds) {
    List<UserResponse> users = new ArrayList<>();
    for (UUID id : userIds) {
      Optional<User> optionalUser = userRepository.findById(id);

      if (optionalUser.isEmpty()) {
        return null;
      }

      User existingUser = optionalUser.get();

      UserResponse userResponse =
          new UserResponse(
              existingUser.getUserId(),
              existingUser.getUserName(),
              existingUser.getName(),
              existingUser.getEmail(),
              existingUser.getLocation(),
              existingUser.getRole().getRoleName().toString(),
              existingUser.getTeamIds());

      users.add(userResponse);
    }

    return users;
  }

  //	@Override
  //	public ResponseEntity<StandardResponse<TeamDto>> getTeamDetails(UUID teamId) {
  //		return teamFeignClient.getTeamById(teamId);
  //	}

  @Override
  public Set<UUID> getUsersInTeam(UUID teamId) {
    return teamFeignClient.getUsersByTeamId(teamId);
  }

  public Object addUserToTeam(UUID teamId, UUID userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return null;
    }

    User existingUser = optionalUser.get();

    if (existingUser.getTeamIds() != null) {

      existingUser.getTeamIds().add(teamId);

      userRepository.save(existingUser);
    } else {
      Set<UUID> teamIds = new HashSet<>();

      teamIds.add(teamId);

      existingUser.setTeamIds(teamIds);

      userRepository.save(existingUser);
    }

    return "User has been added to the team successfully";
  }

  @Override
  public List<TeamDto> getTeamsByUserId(UUID userId, HttpServletRequest request) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) throw new RuntimeException("User not found");

    Set<UUID> userTeams = user.getTeamIds();

    List<TeamDto> teams = new ArrayList<>();

    for (UUID teamId : userTeams) {
      teams.add(Objects.requireNonNull(teamFeignClient.getTeamById(teamId)).getData());
    }

    return teams;
  }

  public Object removeUserFromTeam(UUID teamId, UUID userId) {
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not Found"));
    Set<UUID> teamIds = user.getTeamIds();
    teamIds.remove(teamId);
    user.setTeamIds(teamIds);
    userRepository.save(user);
    return "user removed";
  }

  @Override
  public Object addTaskToUser(UUID taskId, UUID userId) {
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));
    if (user.getTaskIds() == null) {
      List<UUID> taskIds = new ArrayList<>();
      taskIds.add(taskId);
      user.setTaskIds(taskIds);
      userRepository.save(user);

    } else {
      user.getTaskIds().add(taskId);
      userRepository.save(user);
    }

    return "Task assigned to the User";
  }
}
