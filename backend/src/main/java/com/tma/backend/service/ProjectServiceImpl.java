package com.tma.backend.service;

import com.tma.backend.model.Project;
import com.tma.backend.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {
  @Autowired ProjectRepository projectRepository;

  @Override
  public Project createProject(Project project) {
    return projectRepository.save(project);
  }

  @Override
  public Project getProjectById(UUID projectId) {
    return projectRepository.findById(projectId).orElse(null);
  }

  @Override
  public List<Project> getAllProjects() {
    return projectRepository.findAll();
  }

  @Override
  public Project updateProject(UUID projectId, Project project) {
    if (!projectRepository.existsById(projectId)) {
      return null;
    }

    Optional<Project> optionalProject = projectRepository.findById(projectId);

    if (optionalProject.isPresent()) {
      Project project1 = optionalProject.get();
      project1.setProjectTitle(project.getProjectTitle());
      project1.setProjectDescription(project.getProjectDescription());
      projectRepository.save(project1);

      return project1;
    }

    return null;
  }

  @Override
  public void deleteProject(UUID projectId) {
    projectRepository.deleteById(projectId);
  }
}
