package com.tma.user_micro_service.util;

import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.UserRepository;
import java.time.LocalDate;

public class Utilities {

  public static User setupUser(
      RoleRepository roleRepository, UserRepository userRepository, User user, AppRole role) {
    user.setAccountNonLocked(true);
    user.setAccountNonExpired(true);
    user.setCredentialsNonExpired(true);
    user.setEnabled(true);
    user.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
    user.setAccountExpiryDate(LocalDate.now().plusYears(1));
    user.setTwoFactorEnabled(false);
    user.setSignUpMethod("email");
    user.setRole(
        roleRepository
            .findByRoleName(role)
            .orElseThrow(
                () -> new RuntimeException("Error: Role " + role.toString() + " was not found")));

    return userRepository.save(user);
  }
}
