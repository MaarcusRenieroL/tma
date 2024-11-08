package com.tma.backend.service;

import com.tma.backend.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {

  List<User> getAllUsers();

  User createUser(User user);

  User updateUser(UUID userId, User user);

  void deleteUser(UUID userId);

  User getUserById(UUID userId);

  Optional<User> findByUsername(String userName);

  Optional<User> findByEmail(String email);
}
