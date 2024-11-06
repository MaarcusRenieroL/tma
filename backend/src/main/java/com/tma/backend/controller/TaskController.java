package com.tma.backend.controller;

import com.tma.backend.model.Project;
import com.tma.backend.model.Task;
import com.tma.backend.model.Team;
import com.tma.backend.payload.response.StandardResponse;
import com.tma.backend.service.ProjectService;
import com.tma.backend.service.TaskService;
import com.tma.backend.service.TeamService;
import com.tma.backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

  @Autowired private TeamService teamService;
  @Autowired private ProjectService projectService;
  @Autowired private TaskService taskService;

  @GetMapping
  public ResponseEntity<StandardResponse<List<Task>>> getAllTasks(HttpServletRequest request) {
    List<Task> tasks = taskService.getAllTasks();

    if (tasks.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No tasks found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Tasks retrieved successfully", tasks, request, LocalDateTime.now());
  }

  @PostMapping("/team/{teamId}/project/{projectId}")
  public ResponseEntity<StandardResponse<Task>> createTask(
      @PathVariable UUID teamId,
      @PathVariable UUID projectId,
      @RequestBody Task task,
      HttpServletRequest request) {
    try {

      if (task.getTitle() == null
          || task.getDescription() == null
          || task.getDueDate() == null
          || task.getPriority() == null
          || teamId == null
          || projectId == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      Optional<Team> optionalTeam = teamService.getTeamById(teamId);
      Optional<Project> optionalProject = projectService.getProjectById(projectId);

      if (optionalTeam.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Team was not found", request, LocalDateTime.now());
      }

      if (optionalProject.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Project was not found", request, LocalDateTime.now());
      }

      Team team = optionalTeam.get();

      if (!team.getProjects().contains(optionalProject.get())) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST,
            "Team is not linked to this project",
            request,
            LocalDateTime.now());
      }

      Task createdTask = taskService.createTask(task, teamId, projectId);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Task created successfully",
          createdTask,
          request,
          LocalDateTime.now());
    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
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
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "Task not found with ID: " + taskId,
            request,
            LocalDateTime.now());
      }

      Task updatedTask = taskService.updateTask(taskId, task);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "Task updated successfully", updatedTask, request, LocalDateTime.now());

    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
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
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND,
            "Task not found with ID: " + taskId,
            request,
            LocalDateTime.now());
      }

      taskService.deleteTask(taskId);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT, "Task deleted successfully", null, request, LocalDateTime.now());

    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the task",
          request,
          LocalDateTime.now());
    }
  }

  @GetMapping("/{taskId}")
  public ResponseEntity<StandardResponse<Task>> getTaskById(
      @PathVariable UUID taskId, HttpServletRequest request) {
    Optional<Task> optionalTask = taskService.getTaskById(taskId);

    if (optionalTask.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Task not found with ID: " + taskId, request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Task retrieved successfully",
        optionalTask.get(),
        request,
        LocalDateTime.now());
  }

  @GetMapping("/tasks/team/{teamId}")
  public ResponseEntity<StandardResponse<List<Task>>> getTasksByTeam(
      @PathVariable UUID teamId, HttpServletRequest request) {

    List<Task> tasks = taskService.getTasksByTeam(teamId);

    if (!tasks.isEmpty()) {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Tasks retrieved successfully for team",
          tasks,
          request,
          LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND,
        "No tasks found for the specified team",
        request,
        LocalDateTime.now());
  }
}
