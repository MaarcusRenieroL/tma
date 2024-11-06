package com.tma.backend.controller;

import com.tma.backend.model.Project;
import com.tma.backend.payload.response.StandardResponse;
import com.tma.backend.service.ProjectService;
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
@RequestMapping("api/project")
public class ProjectController {
  @Autowired private ProjectService projectService;

  @GetMapping
  public ResponseEntity<StandardResponse<List<Project>>> getAllTasks(HttpServletRequest request) {
    List<Project> projects = projectService.getAllProjects();

    if (projects.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No Project found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Projects retrieved successfully", projects, request, LocalDateTime.now());
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponse<Project>> getProjectById(
      @PathVariable UUID id, HttpServletRequest request) {
    Optional<Project> optionalProject = projectService.getProjectById(id);

    if (optionalProject == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Project not found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Project retrieved successfully",
        optionalProject.get(),
        request,
        LocalDateTime.now());
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Project>> createProject(
      @RequestParam UUID teamId, @RequestBody Project project, HttpServletRequest request) {
    try {
      if (project.getProjectTitle() == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }
      Project createdProject = projectService.createProject(project, teamId);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Project created successfully",
          createdProject,
          request,
          LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while creating the project",
          request,
          LocalDateTime.now());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<StandardResponse<Project>> updateProject(
      @PathVariable UUID id, @RequestBody Project project, HttpServletRequest request) {
    try {
      if (projectService.getProjectById(id) == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "Project not found for update", request, LocalDateTime.now());
      }
      Project updatedProject = projectService.updateProject(id, project);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Project updated successfully",
          updatedProject,
          request,
          LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while updating the project",
          request,
          LocalDateTime.now());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<StandardResponse<Project>> deleteProject(
      @PathVariable UUID id, HttpServletRequest request) {
    try {
      if (projectService.getProjectById(id) == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "Project not found with ID: " + id, request, LocalDateTime.now());
      }

      projectService.deleteProject(id);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.NO_CONTENT,
          "Project deleted successfully",
          null,
          request,
          LocalDateTime.now());

    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while deleting the project",
          request,
          LocalDateTime.now());
    }
  }

  @GetMapping("/team/{teamId}")
  public ResponseEntity<StandardResponse<List<Project>>> getProjectsByTeam(
      @PathVariable UUID teamId, HttpServletRequest request) {

    List<Project> projects = projectService.getProjectsByTeam(teamId);

    if (!projects.isEmpty()) {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Projects retrieved successfully for the team",
          projects,
          request,
          LocalDateTime.now());
    }
    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND,
        "No projects found for the specified team",
        request,
        LocalDateTime.now());
  }

  @PostMapping("/{projectId}/team/{teamId}")
  public ResponseEntity<StandardResponse<Project>> assignTeamToProject(
      @PathVariable UUID projectId, @PathVariable UUID teamId, HttpServletRequest request) {

    Project updatedProject = projectService.assignTeamToProject(projectId, teamId);

    if (updatedProject != null) {
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Team assigned to project successfully",
          updatedProject,
          request,
          LocalDateTime.now());
    }
    return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND,
        "Failed to assign team to project. Project or Team not found",
        request,
        LocalDateTime.now());
  }
}
