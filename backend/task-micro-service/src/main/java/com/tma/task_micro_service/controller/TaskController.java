package com.tma.task_micro_service.controller;

import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.payload.request.CreateTaskRequest;
import com.tma.task_micro_service.payload.response.StandardResponse;
import com.tma.task_micro_service.service.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/tasks")
public class TaskController {
  
  @Autowired private TaskService taskService;
  
  @GetMapping
  public ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request) {
    return taskService.getAllTasks(request);
  }
  
  @PostMapping
  public ResponseEntity<StandardResponse<Task>> createTask(
    @RequestBody CreateTaskRequest taskRequest, HttpServletRequest request) {
    return taskService.createTask(taskRequest.getTask(), taskRequest.getUserId(), request);
  }
  
  @PutMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> updateTask(
    @PathVariable UUID taskId, @RequestBody Task task, HttpServletRequest request) {
    return taskService.updateTask(taskId, task, request);
  }
  
  @DeleteMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Void>> deleteTask(
    @PathVariable UUID taskId, HttpServletRequest request) {
    return taskService.deleteTask(taskId, request);
  }
  
  @GetMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> getTaskById(
    @PathVariable UUID taskId, HttpServletRequest request) {
    return taskService.getTaskById(taskId, request);
  }
  
  @GetMapping("user/{userId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByUserId(
    @PathVariable UUID userId, HttpServletRequest request) {
    return taskService.getTaskByUserId(userId, request);
  }
  
  @GetMapping("team/{teamId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByTeamId(
    @PathVariable UUID teamId, HttpServletRequest request) {
    return taskService.getTaskByTeamId(teamId, request);
  }
  
  @GetMapping("project/{projectId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByProjectId(
    @PathVariable UUID projectId, HttpServletRequest request) {
    return taskService.getTaskByProjectId(projectId, request);
  }
}
