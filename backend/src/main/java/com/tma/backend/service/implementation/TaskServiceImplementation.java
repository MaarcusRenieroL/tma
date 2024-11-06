package com.tma.backend.service.implementation;

import com.tma.backend.model.Project;
import com.tma.backend.model.Task;
import com.tma.backend.model.Team;
import com.tma.backend.model.User;
import com.tma.backend.repository.TaskRepository;
import com.tma.backend.service.TaskService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImplementation implements TaskService {
  @Autowired TaskRepository taskRepo;
  @Autowired private TeamServiceImplementation teamService;
  @Autowired private ProjectServiceImplementation projectService;
  @Autowired private UserServiceImplementation userService;

  @Override
  public List<Task> getAllTasks() {
    return taskRepo.findAll();
  }

  @Override
  public Task createTask(Task task, UUID teamId, UUID projectId) {
    Optional<Team> optionalTeam = teamService.getTeamById(teamId);
    Optional<Project> optionalProject = projectService.getProjectById(projectId);

    if (optionalTeam.isEmpty() || optionalProject.isEmpty()) {
      return null;
    }

    Team team = optionalTeam.get();
    Project project = optionalProject.get();

    task.setTeam(team);
    task.setProject(project);

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

  public Optional<Task> getTaskById(UUID taskId) {
    return taskRepo.findById(taskId);
  }

  @Override
  public List<Task> getTasksByTeam(UUID teamId) {
    return taskRepo.findTaskByTeamId(teamId);
  }

  @Override
  public Task assignUsersToTask(UUID taskId, List<UUID> userIds) {
    Optional<Task> optionalTask = taskRepo.findById(taskId);

    if (optionalTask.isEmpty()) {

      return null;
    }

    Task task = optionalTask.get();

    if (task.getUsers() == null) {
      task.setUsers(new ArrayList<>());
    }
    for (UUID userId : userIds) {
      User user = userService.getUserById(userId);
      if (!task.getUsers().contains(user)) {
        task.getUsers().add(user);

        if (user.getTasks() == null) {
          user.setTasks(new ArrayList<>());
        }
        if (!user.getTasks().contains(task)) {
          user.getTasks().add(task);
        }
      }
    }
    return taskRepo.save(task);
  }

  @Override
  public List<Task> getTasksByUser(UUID userId) {
    return taskRepo.findTaskByUserId(userId);
  }
}
