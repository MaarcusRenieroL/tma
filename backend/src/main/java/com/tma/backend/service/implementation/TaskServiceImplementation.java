package com.tma.backend.service.implementation;

import com.tma.backend.model.Task;
import com.tma.backend.repository.TaskRepository;
import com.tma.backend.service.TaskService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImplementation implements TaskService {
  @Autowired TaskRepository taskRepo;

  @Override
  public List<Task> getAllTasks() {
    return taskRepo.findAll();
  }

  @Override
  public Task createTask(Task task) {
    return taskRepo.save(task);
  }

  @Override
  public Task updateTask(UUID taskId, Task task) {
    if (!taskRepo.existsById(taskId)) {
      return null;
    }

    Optional<Task> optionalTask = taskRepo.findById(taskId);

    if (optionalTask.isPresent()) {
      Task task1 = optionalTask.get();
      task1.setTitle(task.getTitle());
      task1.setStatus(task.getStatus());
      task1.setPriority(task.getPriority());
      task1.setDescription(task.getDescription());
      task1.setDueDate(task.getDueDate());
      task1.setDateAllocated(task.getDateAllocated());

      taskRepo.save(task1);

      return task1;
    }

    return null;
  }

  public void deleteTask(UUID taskId) {
    taskRepo.deleteById(taskId);
  }

  public Task getTaskById(UUID taskId) {
    return taskRepo.findById(taskId).orElse(null);
  }
}
