package com.tma.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.tma.backend.model.Role;
import com.tma.backend.model.User;
import com.tma.backend.repository.UserRepository;
import com.tma.backend.service.UserServiceImpl;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserServiceTests {
  @Mock private UserRepository userRepo;

  @InjectMocks private UserServiceImpl userService;

  private User user;
  private UUID userId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    userId = UUID.randomUUID();
    user =
        new User(
            userId, "John Doe", Role.ADMIN, "john.doe@example.com", "password123", "Trivandrum");
  }

  @Test
  void getAllUsersReturnListOfUsers() {
    when(userRepo.findAll()).thenReturn(Collections.singletonList(user));

    List<User> users = userService.getAllUsers();

    assertNotNull(users);
    assertEquals(1, users.size());
    assertEquals("John Doe", users.getFirst().getName());
  }

  @Test
  void createUser_shouldReturnCreatedUser() {
    when(userRepo.save(any(User.class))).thenReturn(user);

    User createdUser = userService.createUser(user);

    assertNotNull(createdUser);
    assertEquals("John Doe", createdUser.getName());
  }

  @Test
  void updateUser_existingUser_shouldReturnUpdatedUser() {
    when(userRepo.existsById(userId)).thenReturn(true);
    when(userRepo.findById(userId)).thenReturn(Optional.of(user));
    when(userRepo.save(any(User.class))).thenReturn(user);

    User updatedUser = userService.updateUser(userId, user);

    assertNotNull(updatedUser);
    assertEquals("John Doe", updatedUser.getName());
    verify(userRepo, times(1)).save(user);
  }

  @Test
  void updateUser_nonExistingUser_shouldReturnNull() {
    when(userRepo.existsById(userId)).thenReturn(false);

    User updatedUser = userService.updateUser(userId, user);

    assertNull(updatedUser);
    verify(userRepo, never()).save(any(User.class));
  }

  @Test
  void deleteUser_shouldInvokeDeleteMethod() {
    userService.deleteUser(userId);

    verify(userRepo, times(1)).deleteById(userId);
  }

  @Test
  void getUserById_existingUser_shouldReturnUser() {
    when(userRepo.findById(userId)).thenReturn(Optional.of(user));

    User foundUser = userService.getUserById(userId);

    assertNotNull(foundUser);
    assertEquals("John Doe", foundUser.getName());
  }

  @Test
  void getUserById_nonExistingUser_shouldReturnNull() {
    when(userRepo.findById(userId)).thenReturn(Optional.empty());

    User foundUser = userService.getUserById(userId);

    assertNull(foundUser);
  }
}
