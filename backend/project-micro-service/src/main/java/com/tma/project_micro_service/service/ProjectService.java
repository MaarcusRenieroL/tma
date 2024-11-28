package com.tma.project_micro_service.service;

import com.tma.project_micro_service.model.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectService {

  Project createProject(Project project, UUID teamId);

  Optional<Project> getProjectById(UUID projectId);

  List<Project> getAllProjects();

  Project updateProject(UUID projectId, Project project);

  void deleteProject(UUID projectId);
  
//  List<Project> getProjectsByTeam(UUID teamId);

//  Project assignTeamToProject(UUID projectId, UUID teamId);

  
  

}
