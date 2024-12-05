package com.tma.project_micro_service.service;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.model.Project;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectService {

  Project createProject(Project project, UUID teamId, UUID userId, HttpServletRequest request);

  Optional<Project> getProjectById(UUID projectId);

  List<Project> getAllProjects();

  Project updateProject(UUID projectId, Project project);

  void deleteProject(UUID projectId);

  List<Project> getProjectsByTeamId(UUID teamId);

  List<User> getUsersForProject(UUID projectId);
}
