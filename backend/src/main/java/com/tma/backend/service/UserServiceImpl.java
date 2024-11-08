package com.tma.backend.service;

import com.tma.backend.model.User;
import com.tma.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired UserRepository userRepo;
  @Autowired private PasswordEncoder passwordEncoder;

  @Override
  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  @Override
  public User createUser(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
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
      user1.setPassword(passwordEncoder.encode(user1.getPassword()));
      user1.setUserName(user.getUserName());
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

  public Optional<User> findByUsername(String userName) {
    return userRepo.findByUserName(userName);
  }

  public Optional<User> findByEmail(String email) {
    return userRepo.findByEmail(email);
  }
}
