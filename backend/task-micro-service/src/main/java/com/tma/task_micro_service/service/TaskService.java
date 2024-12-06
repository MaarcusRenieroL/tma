package com.tma.task_micro_service.service;

import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;

public interface TaskService {

  ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request);

  ResponseEntity<StandardResponse<Task>> createTask(
      Task task, UUID userId, HttpServletRequest request);

  ResponseEntity<StandardResponse<Task>> updateTask(
      UUID taskId, Task task, HttpServletRequest request);

  ResponseEntity<StandardResponse<Void>> deleteTask(UUID taskId, HttpServletRequest request);

  ResponseEntity<StandardResponse<Task>> getTaskById(UUID taskId, HttpServletRequest request);

  ResponseEntity<StandardResponse<List<Task>>> getTaskByUserId(
      UUID userId, HttpServletRequest request);

  ResponseEntity<StandardResponse<List<Task>>> getTaskByTeamId(
      UUID teamId, HttpServletRequest request);

  ResponseEntity<StandardResponse<List<Task>>> getTaskByProjectId(
      UUID projectId, HttpServletRequest request);
}
