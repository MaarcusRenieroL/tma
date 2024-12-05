package com.tma.task_micro_service.service;

import com.tma.task_micro_service.feign.UserFeignClient;
import com.tma.task_micro_service.model.Task;
import com.tma.task_micro_service.repository.TaskRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {
  @Autowired TaskRepository taskRepo;
  @Autowired UserFeignClient userFeignClient;

  @Override
  public List<Task> getAllTasks() {
    return taskRepo.findAll();
  }

  @Override
  public Task createTask(Task task, UUID userId, HttpServletRequest request) {

    String bearerToken = request.getHeader("Authorization");

    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      
      if(task.getUserIds()==null) {
        Set<UUID> userIds = new HashSet<>();
        userIds.add(userId);
        task.setUserIds(userIds);
      }
      else {
       Set<UUID> userIds=task.getUserIds();
       userIds.add(userId);
       task.setUserIds(userIds);
       
       
      }
      Task savedTeam = taskRepo.save(task);

      userFeignClient.addTaskToUser(savedTeam.getTeamId(), userId, bearerToken);

      return savedTeam;
    }

    return null;
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
  
  @Override
  public List<Task> getTaskByUserId(UUID userId) {
    return taskRepo.findTaskByUserIds(userId);
  }
  
  @Override
  public List<Task> getTaskByTeamId(UUID teamId) {
    return taskRepo.findByTeamId(teamId);
  }
  
  @Override
  public List<Task> getTaskByProjectId(UUID projectId) {
    return taskRepo.findByProjectId(projectId);
    
  }
}
