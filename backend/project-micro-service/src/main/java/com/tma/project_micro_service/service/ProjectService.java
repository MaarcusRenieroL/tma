package com.tma.project_micro_service.service;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.model.Project;
import com.tma.project_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;

public interface ProjectService {
  
  ResponseEntity<StandardResponse<Project>> createProject(
    Project project, UUID teamId, UUID userId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Project>> getProjectById(
    UUID projectId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<List<Project>>> getAllProjects(HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Project>> updateProject(
    UUID projectId, Project project, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<Void>> deleteProject(UUID projectId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<List<Project>>> getProjectsByTeamId(
    UUID teamId, HttpServletRequest request);
  
  ResponseEntity<StandardResponse<List<User>>> getUsersForProject(UUID projectId, HttpServletRequest request);
}
