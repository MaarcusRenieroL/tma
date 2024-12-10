package com.tma.project_micro_service.controller;

import com.tma.project_micro_service.model.Project;
import com.tma.project_micro_service.payload.request.CreateProjectRequest;
import com.tma.project_micro_service.payload.response.StandardResponse;
import com.tma.project_micro_service.service.ProjectService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/projects")
public class ProjectController {

  @Autowired private ProjectService projectService;

  @GetMapping
  public ResponseEntity<StandardResponse<List<Project>>> getAllProjects(
      HttpServletRequest request) {
    return projectService.getAllProjects(request);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StandardResponse<Project>> getProjectById(
      @PathVariable UUID id, HttpServletRequest request) {
    return projectService.getProjectById(id, request);
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Project>> createProject(
      @RequestBody CreateProjectRequest createProjectRequest, HttpServletRequest request) {
    return projectService.createProject(
        createProjectRequest.getProject(),
        createProjectRequest.getTeamId(),
        createProjectRequest.getUserIds(),
        createProjectRequest.getOrganizationId(),
        request);
  }

  @PutMapping("/{id}")
  public ResponseEntity<StandardResponse<Project>> updateProject(
      @PathVariable UUID id, @RequestBody Project project, HttpServletRequest request) {
    return projectService.updateProject(id, project, request);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<StandardResponse<Void>> deleteProject(
      @PathVariable UUID id, HttpServletRequest request) {
    return projectService.deleteProject(id, request);
  }

  @GetMapping("/team/{teamId}")
  public ResponseEntity<StandardResponse<List<Project>>> getProjectsByTeamId(
      @PathVariable UUID teamId, HttpServletRequest request) {
    return projectService.getProjectsByTeamId(teamId, request);
  }
  
  @GetMapping("/organization/{organizationId}")
  public ResponseEntity<StandardResponse<List<Project>>> getProjectsByOrganizationId(@PathVariable UUID organizationId, HttpServletRequest request) {
    return projectService.getProjectsByOrganizationId(organizationId, request);
  }
}
