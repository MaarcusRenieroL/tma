package com.tma.task_micro_service.service;

import com.tma.task_micro_service.feign.UserFeignClient;
import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.payload.response.StandardResponse;
import com.tma.task_micro_service.repository.TaskRepository;
import com.tma.task_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

  @Autowired TaskRepository taskRepo;

  @Autowired UserFeignClient userFeignClient;

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request) {
    List<Task> tasks = taskRepo.findAll();
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> createTask(
      Task task, UUID userId, HttpServletRequest request) {

    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      if (task.getUserIds() == null) {
        Set<UUID> userIds = new HashSet<>();
        userIds.add(userId);
        task.setUserIds(userIds);
      } else {
        task.getUserIds().add(userId);
      }

      Task savedTask = taskRepo.save(task);
      userFeignClient.addTaskToUser(savedTask.getTeamId(), userId, bearerToken);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED, "Task created successfully", savedTask, request, LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.UNAUTHORIZED, "Invalid or missing bearer token", request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> updateTask(
      UUID taskId, Task task, HttpServletRequest request) {
    if (!taskRepo.existsById(taskId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }

    Optional<Task> optionalTask = taskRepo.findById(taskId);

    if (optionalTask.isPresent()) {
      Task existingTask = optionalTask.get();
      existingTask.setTitle(task.getTitle());
      existingTask.setStatus(task.getStatus());
      existingTask.setPriority(task.getPriority());
      existingTask.setDescription(task.getDescription());
      existingTask.setDueDate(task.getDueDate());
      existingTask.setDateAllocated(task.getDateAllocated());

      taskRepo.save(existingTask);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "Task updated successfully", existingTask, request, LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Void>> deleteTask(
      UUID taskId, HttpServletRequest request) {
    if (!taskRepo.existsById(taskId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }

    taskRepo.deleteById(taskId);
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Task deleted successfully", null, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> getTaskById(
      UUID taskId, HttpServletRequest request) {
    Task task = taskRepo.findById(taskId).orElse(null);

    if (task == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Task retrieved successfully", task, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getTaskByUserId(
      UUID userId, HttpServletRequest request) {
    List<Task> tasks = taskRepo.findTaskByUserIds(userId);
    if (tasks.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getTaskByTeamId(
      UUID teamId, HttpServletRequest request) {
    List<Task> tasks = taskRepo.findByTeamId(teamId);
    
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getTaskByProjectId(
      UUID projectId, HttpServletRequest request) {
    List<Task> tasks = taskRepo.findByProjectId(projectId);
    if (tasks.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }
}
