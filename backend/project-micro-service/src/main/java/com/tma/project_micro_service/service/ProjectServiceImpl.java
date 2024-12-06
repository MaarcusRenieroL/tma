package com.tma.project_micro_service.service;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.feign.TeamFeignClient;
import com.tma.project_micro_service.feign.UserFeignClient;
import com.tma.project_micro_service.model.Project;
import com.tma.project_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.project_micro_service.payload.request.AssignProjectToUserRequest;
import com.tma.project_micro_service.repository.ProjectRepository;
import com.tma.project_micro_service.util.ResponseUtil;
import com.tma.project_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {
  
  private final ProjectRepository projectRepository;
  private final TeamFeignClient teamFeignClient;
  private final UserFeignClient userFeignClient;
  
  public ProjectServiceImpl(
    ProjectRepository projectRepository,
    TeamFeignClient teamFeignClient,
    UserFeignClient userFeignClient) {
    this.projectRepository = projectRepository;
    this.teamFeignClient = teamFeignClient;
    this.userFeignClient = userFeignClient;
  }
  
  @Override
  public ResponseEntity<StandardResponse<Project>> createProject(
    Project project, UUID teamId, UUID userId, HttpServletRequest request) {
    
    String bearerToken = request.getHeader("Authorization");
    log.info("JWT: {}", bearerToken);
    
    if (bearerToken == null) {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.UNAUTHORIZED, "Authorization token is missing", request, LocalDateTime.now());
    }
    
    if (project.getTeamId() == null) {
      project.setTeamId(teamId);
    }
    if (project.getUserIds() == null) {
      Set<UUID> userIds = new HashSet<>();
      userIds.add(userId);
      project.setUserIds(userIds);
    } else {
      Set<UUID> userIds = project.getUserIds();
      userIds.add(userId);
      project.setUserIds(userIds);
    }
    
    try {
      Project savedProject = projectRepository.save(project);
      
      // Assign the project to the team and user via the Feign clients
      teamFeignClient.assignProjectToTeam(
        new AssignProjectToTeamRequest(savedProject.getProjectId(), teamId), bearerToken);
      userFeignClient.assignProjectToUser(
        new AssignProjectToUserRequest(savedProject.getProjectId(), userId), bearerToken);
      
      return ResponseUtil.buildSuccessMessage(
        HttpStatus.CREATED, "Project created successfully", savedProject, request, LocalDateTime.now());
      
    } catch (Exception e) {
      log.error("Error while creating project: {}", e.getMessage());
      return ResponseUtil.buildErrorMessage(
        HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while creating the project", request, LocalDateTime.now());
    }
  }
  
  @Override
  public ResponseEntity<StandardResponse<Project>> getProjectById(
    UUID projectId, HttpServletRequest request) {
    
    Optional<Project> project = projectRepository.findById(projectId);
    if (project.isPresent()) {
      return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Project retrieved successfully", project.orElse(null), request, LocalDateTime.now());
    } else {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "Project not found with ID: " + projectId, request, LocalDateTime.now());
    }
  }
  
  @Override
  public ResponseEntity<StandardResponse<List<Project>>> getAllProjects(HttpServletRequest request) {
    List<Project> projects = projectRepository.findAll();
    if (projects.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "No projects found", request, LocalDateTime.now());
    }
    
    return ResponseUtil.buildSuccessMessage(
      HttpStatus.OK, "Projects retrieved successfully", projects, request, LocalDateTime.now());
  }
  
  @Override
  public ResponseEntity<StandardResponse<Project>> updateProject(
    UUID projectId, Project project, HttpServletRequest request) {
    
    if (!projectRepository.existsById(projectId)) {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "Project not found with ID: " + projectId, request, LocalDateTime.now());
    }
    
    try {
      Optional<Project> optionalProject = projectRepository.findById(projectId);
      
      if (optionalProject.isPresent()) {
        Project projectToUpdate = optionalProject.get();
        projectToUpdate.setProjectTitle(project.getProjectTitle());
        projectToUpdate.setProjectDescription(project.getProjectDescription());
        projectRepository.save(projectToUpdate);
        
        return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK, "Project updated successfully", projectToUpdate, request, LocalDateTime.now());
      }
    } catch (Exception e) {
      log.error("Error while updating project: {}", e.getMessage());
      return ResponseUtil.buildErrorMessage(
        HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while updating the project", request, LocalDateTime.now());
    }
    
    return ResponseUtil.buildErrorMessage(
      HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while updating the project", request, LocalDateTime.now());
  }
  
  @Override
  public ResponseEntity<StandardResponse<Void>> deleteProject(UUID projectId, HttpServletRequest request) {
    if (!projectRepository.existsById(projectId)) {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "Project not found with ID: " + projectId, request, LocalDateTime.now());
    }
    
    try {
      projectRepository.deleteById(projectId);
      
      return ResponseUtil.buildSuccessMessage(
        HttpStatus.NO_CONTENT, "Project deleted successfully", null, request, LocalDateTime.now());
    } catch (Exception e) {
      log.error("Error while deleting project: {}", e.getMessage());
      return ResponseUtil.buildErrorMessage(
        HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while deleting the project", request, LocalDateTime.now());
    }
  }
  
  @Override
  public ResponseEntity<StandardResponse<List<Project>>> getProjectsByTeamId(
    UUID teamId, HttpServletRequest request) {
    
    List<Project> projects = projectRepository.findProjectsByTeamId(teamId);
    if (projects.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
        HttpStatus.NOT_FOUND, "No projects found for team with ID: " + teamId, request, LocalDateTime.now());
    }
    
    return ResponseUtil.buildSuccessMessage(
      HttpStatus.OK, "Projects for team retrieved successfully", projects, request, LocalDateTime.now());
  }
  
  @Override
  public ResponseEntity<StandardResponse<List<User>>> getUsersForProject(
    UUID projectId, HttpServletRequest request) {
    
    try {
      List<User> users = userFeignClient.getUsersByProjectId(projectId);
      if (users.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No users found for project with ID: " + projectId, request, LocalDateTime.now());
      }
      
      return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Users for project retrieved successfully", users, request, LocalDateTime.now());
    } catch (Exception e) {
      log.error("Error retrieving users for project: {}", e.getMessage());
      return ResponseUtil.buildErrorMessage(
        HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while retrieving users for project", request, LocalDateTime.now());
    }
  }
}
