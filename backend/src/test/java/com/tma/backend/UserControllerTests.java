package com.tma.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tma.backend.controller.UserController;
import com.tma.backend.model.Role;
import com.tma.backend.model.User;
import com.tma.backend.service.UserServiceImpl;
import com.tma.backend.util.ResponseUtil;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
public class UserControllerTests {

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @MockBean private UserServiceImpl userService;

  @MockBean private ResponseUtil responseUtil;

  private User user;
  private UUID userId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    userId = UUID.randomUUID();
    user =
        new User(
            userId,
            "John Doe",
            Role.DEVELOPER,
            "john.doe@example.com",
            "password123",
            "Trivandrum");
  }

  @Test
  void getAllUsers_NoUsersFound_ShouldReturnNotFound() throws Exception {
    when(userService.getAllUsers()).thenReturn(Collections.emptyList());

    mockMvc
        .perform(get("/api/users").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("No users found"));

    verify(userService, times(1)).getAllUsers();
  }

  @Test
  void getAllUsers_UsersFound_ShouldReturnOk() throws Exception {
    when(userService.getAllUsers()).thenReturn(List.of(user));

    mockMvc
        .perform(get("/api/users").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Users retrieved successfully"))
        .andExpect(jsonPath("$.data[0].name").value("John Doe"));

    verify(userService, times(1)).getAllUsers();
  }

  @Test
  void createUser_ValidUser_ShouldReturnCreated() throws Exception {
    when(userService.createUser(any(User.class))).thenReturn(user);

    mockMvc
        .perform(
            post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.message").value("User created successfully"))
        .andExpect(jsonPath("$.data.name").value("John Doe"));

    verify(userService, times(1)).createUser(any(User.class));
  }

  @Test
  void createUser_MissingFields_ShouldReturnBadRequest() throws Exception {
    user.setName(null); // Missing required name field

    mockMvc
        .perform(
            post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Missing required fields"));

    verify(userService, never()).createUser(any(User.class));
  }

  @Test
  void getUserById_UserFound_ShouldReturnOk() throws Exception {
    when(userService.getUserById(userId)).thenReturn(user);

    mockMvc
        .perform(get("/api/users/{userId}", userId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("User retrieved successfully"))
        .andExpect(jsonPath("$.data.name").value("John Doe"));

    verify(userService, times(1)).getUserById(userId);
  }

  @Test
  void getUserById_UserNotFound_ShouldReturnNotFound() throws Exception {
    when(userService.getUserById(userId)).thenReturn(null);

    mockMvc
        .perform(get("/api/users/{userId}", userId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("User not found with ID: " + userId));

    verify(userService, times(1)).getUserById(userId);
  }

  @Test
  void updateUser_ValidUser_ShouldReturnOk() throws Exception {
    when(userService.getUserById(userId)).thenReturn(user);
    when(userService.updateUser(eq(userId), any(User.class))).thenReturn(user);

    mockMvc
        .perform(
            put("/api/users/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("User updated successfully"))
        .andExpect(jsonPath("$.data.name").value("John Doe"));

    verify(userService, times(1)).updateUser(eq(userId), any(User.class));
  }

  @Test
  void updateUser_UserNotFound_ShouldReturnNotFound() throws Exception {
    when(userService.getUserById(userId)).thenReturn(null);

    mockMvc
        .perform(
            put("/api/users/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("User not found with ID: " + userId));

    verify(userService, never()).updateUser(eq(userId), any(User.class));
  }

  @Test
  void deleteUser_UserFound_ShouldReturnNoContent() throws Exception {
    when(userService.getUserById(userId)).thenReturn(user);

    mockMvc
        .perform(delete("/api/users/{userId}", userId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(userService, times(1)).deleteUser(userId);
  }

  @Test
  void deleteUser_UserNotFound_ShouldReturnNotFound() throws Exception {
    when(userService.getUserById(userId)).thenReturn(null);

    mockMvc
        .perform(delete("/api/users/{userId}", userId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("User not found with ID: " + userId));

    verify(userService, never()).deleteUser(userId);
  }
}
