package com.tma.backend.service;

import com.tma.backend.model.Task;
import java.util.List;
import java.util.UUID;

public interface TaskService {

  List<Task> getAllTasks();

  Task createTask(Task task);

  Task updateTask(UUID taskId, Task task);

  void deleteTask(UUID taskId);

  Task getTaskById(UUID taskId);
}
