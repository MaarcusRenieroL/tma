package com.tma.user_micro_service.service;

import com.tma.user_micro_service.model.User;
import java.util.List;
import java.util.UUID;

public interface UserService {

  List<User> getAllUsers();

  User createUser(User user);

  User updateUser(UUID userId, User user);

  void deleteUser(UUID userId);

  User getUserById(UUID userId);
}