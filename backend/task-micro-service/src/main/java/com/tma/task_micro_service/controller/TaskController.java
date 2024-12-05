package com.tma.task_micro_service.controller;

import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.payload.request.CreateTaskRequest;
import com.tma.task_micro_service.payload.response.StandardResponse;
import com.tma.task_micro_service.service.TaskService;
import com.tma.task_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

  @Autowired private TaskService taskService;
  private ResponseUtil responseUtil;

  @GetMapping
  public ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request) {
    List<Task> tasks = taskService.getAllTasks();

    if (tasks.isEmpty()) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No tasks found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks retrieved successfully", tasks, request, LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Task>> createTask(
      @RequestBody CreateTaskRequest taskRequest, HttpServletRequest request) {
    try {

      if (taskRequest.getTask().getTitle() == null
          || taskRequest.getTask().getDescription() == null
          || taskRequest.getTask().getDueDate() == null
          || taskRequest.getTask().getPriority() == null) {
        return responseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      Task createdTask =
          taskService.createTask(taskRequest.getTask(), taskRequest.getUserId(), request);

      return responseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Task created successfully",
          createdTask,
          request,
          LocalDateTime.now());
    } catch (Exception e) {

      return responseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while creating the task",
          request,
          LocalDateTime.now());
    }
  }

  @PutMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> updateUser(
      @PathVariable UUID taskId, @RequestBody Task task, HttpServletRequest request) {
    try {

      if (taskService.getTaskById(taskId) == null) {
        return responseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "Task not found with ID: " + taskId,
            request,
            LocalDateTime.now());
      }

      Task updatedTask = taskService.updateTask(taskId, task);

      return responseUtil.buildSuccessMessage(
          HttpStatus.OK, "Task updated successfully", updatedTask, request, LocalDateTime.now());

    } catch (Exception e) {

      return responseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while updating the task",
          request,
          LocalDateTime.now());
    }
  }

  @DeleteMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> deleteTask(
      @PathVariable UUID taskId, HttpServletRequest request) {
    try {

      if (taskService.getTaskById(taskId) == null) {
        return responseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "Task not found with ID: " + taskId,
            request,
            LocalDateTime.now());
      }

      taskService.deleteTask(taskId);

      return responseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "Task deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {

      return responseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the task",
          request,
          LocalDateTime.now());
    }
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> getTaskById(
      @PathVariable UUID taskId, HttpServletRequest request) {
    Task task = taskService.getTaskById(taskId);

    if (task == null) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found with ID: " + taskId, request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Task retrieved successfully", task, request, LocalDateTime.now());
  }

  @GetMapping("user/{userId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByUserId(
      @PathVariable UUID userId, HttpServletRequest request) {
    List<Task> tasks = taskService.getTaskByUserId(userId);
    if (tasks.isEmpty()) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No tasks found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks retrieved successfully", tasks, request, LocalDateTime.now());
  }

  @GetMapping("team/{teamId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByTeamId(
      @PathVariable UUID teamId, HttpServletRequest request) {
    List<Task> tasks = taskService.getTaskByTeamId(teamId);
    if (tasks.isEmpty()) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No tasks found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks retrieved successfully", tasks, request, LocalDateTime.now());
  }

  @GetMapping("project/{projectId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByProjectId(
      @PathVariable UUID projectId, HttpServletRequest request) {
    List<Task> tasks = taskService.getTaskByUserId(projectId);
    if (tasks.isEmpty()) {
      return responseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No tasks found", request, LocalDateTime.now());
    }

    return responseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks retrieved successfully", tasks, request, LocalDateTime.now());
  }
}
