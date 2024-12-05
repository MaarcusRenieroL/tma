package com.tma.task_micro_service.service;

import com.tma.task_micro_service.model.Task;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

public interface TaskService {

  List<Task> getAllTasks();

  Task createTask(Task task, UUID userId, HttpServletRequest request);

  Task updateTask(UUID taskId, Task task);

  void deleteTask(UUID taskId);

  Task getTaskById(UUID taskId);
  List<Task> getTaskByUserId(UUID userId);
  List<Task> getTaskByTeamId(UUID teamId);
  List<Task> getTaskByProjectId(UUID projectId);
}

