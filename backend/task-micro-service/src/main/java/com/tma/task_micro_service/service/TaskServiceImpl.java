package com.tma.task_micro_service.service;

import com.tma.task_micro_service.feign.UserFeignClient;
import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.payload.response.StandardResponse;
import com.tma.task_micro_service.repository.TaskRepository;
import com.tma.task_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

  private final TaskRepository taskRepository;
  private final UserFeignClient userFeignClient;

  public TaskServiceImpl(TaskRepository taskRepository, UserFeignClient userFeignClient) {
    this.taskRepository = taskRepository;
    this.userFeignClient = userFeignClient;
  }

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request) {
    List<Task> tasks = taskRepository.findAll();
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> createTask(
      Task task, List<UUID> userIds, HttpServletRequest request) {

    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {

      if (task.getTitle() == null
          || task.getDescription() == null
          || task.getStatus() == null
          || task.getDueDate() == null
          || task.getPriority() == null
          || task.getProjectId() == null
          || task.getTeamId() == null
          || task.getOrganizationId() == null
          || userIds.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      task.setUserIds(new HashSet<>(userIds));
      Task savedTask = taskRepository.save(task);

      userFeignClient.addTaskToUsers(savedTask.getTaskId(), userIds, bearerToken);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "Task created successfully", savedTask, request, LocalDateTime.now());

    } else {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.UNAUTHORIZED, "Unauthorized", request, LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> updateTask(
      UUID taskId, Task task, HttpServletRequest request) {
    if (!taskRepository.existsById(taskId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }

    Optional<Task> optionalTask = taskRepository.findById(taskId);

    if (optionalTask.isPresent()) {
      Task existingTask = optionalTask.get();
      existingTask.setTitle(task.getTitle());
      existingTask.setStatus(task.getStatus());
      existingTask.setPriority(task.getPriority());
      existingTask.setDescription(task.getDescription());
      existingTask.setDueDate(task.getDueDate());
      existingTask.setDateAllocated(task.getDateAllocated());

      taskRepository.save(existingTask);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "Task updated successfully", existingTask, request, LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Void>> deleteTask(
      UUID taskId, HttpServletRequest request) {
    if (!taskRepository.existsById(taskId)) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }

    taskRepository.deleteById(taskId);
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Task deleted successfully", null, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Task>> getTaskById(
      UUID taskId, HttpServletRequest request) {
    Task task = taskRepository.findById(taskId).orElse(null);

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
    List<Task> tasks = taskRepository.findTaskByUserIds(userId);
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
    List<Task> tasks = taskRepository.findByTeamId(teamId);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<Task>>> getTaskByProjectId(
      UUID projectId, HttpServletRequest request) {
    List<Task> tasks = taskRepository.findByProjectId(projectId);
    if (tasks.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found", request, LocalDateTime.now());
    }
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks fetched successfully", tasks, request, LocalDateTime.now());
  }
}
