package com.tma.user_micro_service.util;

import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;

public class Utilities {

  public static User setupUser(
      RoleRepository roleRepository, UserRepository userRepository, User user, AppRole role) {
    user.setSignUpMethod("email");
    user.setRole(
        roleRepository
            .findByRoleName(role)
            .orElseThrow(
                () -> new RuntimeException("Error: Role " + role.toString() + " was not found")));

    return userRepository.save(user);
  }
}
