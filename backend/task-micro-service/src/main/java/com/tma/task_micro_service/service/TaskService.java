package com.tma.task_micro_service.service;

import com.tma.task_micro_service.model.Task;
import java.util.List;
import java.util.UUID;

public interface TaskService {

  List<Task> getAllTasks();

  Task createTask(Task task);

  Task updateTask(UUID taskId, Task task);

  void deleteTask(UUID taskId);

  Task getTaskById(UUID taskId);
}