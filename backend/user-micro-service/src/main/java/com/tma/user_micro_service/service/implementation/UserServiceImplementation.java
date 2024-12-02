package com.tma.user_micro_service.service.implementation;

import com.netflix.discovery.converters.Auto;
import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.feign.UserTeamInterface;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.UserService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {
  @Autowired private UserRepository userRepository;
  
  @Autowired
  private UserTeamInterface userTeamInterface;

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
    List<User> users= new ArrayList<>();
    for(UUID id : userIds){
      users.add(userRepository.findById(id).get());
      
    }
    return users;
  }
  @Override
  public ResponseEntity<StandardResponse<TeamDto>> getTeamDetails(UUID teamId){
    return userTeamInterface.getTeamById(teamId);
    
  }
  @Override
  public List<UUID> getUsersInTeam(UUID teamId) {
    return userTeamInterface.getUsersByTeamId(teamId);
  }
}
