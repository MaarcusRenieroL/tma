package com.tma.user_micro_service.controller;

import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.service.UserService;
import com.tma.user_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {

  @Autowired private UserService userService;

  @GetMapping
  public ResponseEntity<StandardResponse<List<User>>> getAllUsers(HttpServletRequest request) {
    List<User> users = userService.getAllUsers();

    if (users.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No users found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Users retrieved successfully", users, request, LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<User>> createUser(
      @RequestBody User user, HttpServletRequest request) {
    try {

      if (user.getName() == null || user.getEmail() == null || user.getLocation() == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      User createdUser = userService.createUser(user);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "User created successfully",
          createdUser,
          request,
          LocalDateTime.now());
    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while creating the user",
          request,
          LocalDateTime.now());
    }
  }

  @PutMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> updateUser(
      @PathVariable UUID userId, @RequestBody User user, HttpServletRequest request) {
    try {

      if (userService.getUserById(userId) == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "User not found with ID: " + userId,
            request,
            LocalDateTime.now());
      }

      User updatedUser = userService.updateUser(userId, user);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "User updated successfully", updatedUser, request, LocalDateTime.now());

    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while updating the user",
          request,
          LocalDateTime.now());
    }
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> deleteUser(
      @PathVariable UUID userId, HttpServletRequest request) {
    try {

      if (userService.getUserById(userId) == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "User not found with ID: " + userId,
            request,
            LocalDateTime.now());
      }

      userService.deleteUser(userId);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "User deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the user",
          request,
          LocalDateTime.now());
    }
  }

  @GetMapping("/{userId}")
  public ResponseEntity<StandardResponse<User>> getUserById(
      @PathVariable UUID userId, HttpServletRequest request) {
    User user = userService.getUserById(userId);

    if (user == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User not found with ID: " + userId, request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "User retrieved successfully", user, request, LocalDateTime.now());
  }
  @PostMapping("/usersId")
  public List<User> getAllUsersByIds(@RequestParam List<UUID> userIds) {
    return userService.getAllUsersByIds(userIds);
  }
}
