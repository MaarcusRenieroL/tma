package com.tma.backend.service;

import com.tma.backend.model.Project;
import java.util.List;
import java.util.UUID;

public interface ProjectService {

  Project createProject(Project project);

  Project getProjectById(UUID projectId);

  List<Project> getAllProjects();

  Project updateProject(UUID projectId, Project project);

  void deleteProject(UUID projectId);
}
