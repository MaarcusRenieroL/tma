package com.tma.user_micro_service.service;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired UserRepository userRepo;

  @Override
  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  @Override
  public User createUser(User user) {
    return userRepo.save(user);
  }

  @Override
  public User updateUser(UUID userId, User user) {
    if (!userRepo.existsById(userId)) {
      return null;
    }

    Optional<User> optionalUser = userRepo.findById(userId);

    if (optionalUser.isPresent()) {
      User user1 = optionalUser.get();
      user1.setName(user.getName());
      user1.setRole(user.getRole());
      user1.setEmail(user.getEmail());
      user1.setLocation(user.getLocation());
      user1.setPassword(user.getPassword());

      userRepo.save(user1);

      return user1;
    }

    return null;
  }

  public void deleteUser(UUID userId) {
    userRepo.deleteById(userId);
  }

  public User getUserById(UUID userId) {
    return userRepo.findById(userId).orElse(null);
  }
}
