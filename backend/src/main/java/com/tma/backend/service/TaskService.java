package com.tma.backend.service;

import com.tma.backend.model.Task;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskService {

  List<Task> getAllTasks();

  Task createTask(Task task, UUID teamId, UUID projectId);

  Task updateTask(UUID taskId, Task task);

  void deleteTask(UUID taskId);

  Optional<Task> getTaskById(UUID taskId);

  List<Task> getTasksByTeam(UUID teamId);
}
