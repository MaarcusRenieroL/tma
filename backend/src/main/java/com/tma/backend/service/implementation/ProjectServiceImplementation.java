package com.tma.backend.service.implementation;

import com.tma.backend.model.Project;
import com.tma.backend.model.Team;
import com.tma.backend.repository.ProjectRepository;
import com.tma.backend.service.ProjectService;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImplementation implements ProjectService {
  @Autowired private ProjectRepository projectRepository;
  @Autowired private TeamServiceImplementation teamServiceImplementation;

  @Override
  public Project createProject(Project project, UUID teamId) {
    Optional<Team> optionalTeam = teamServiceImplementation.getTeamById(teamId);

    if (optionalTeam.isEmpty()) {
      return null;
    }

    Team team = optionalTeam.get();

    project.setTeam(team);

    return projectRepository.save(project);
  }

  @Override
  public Optional<Project> getProjectById(UUID projectId) {
    return projectRepository.findById(projectId);
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

  @Override
  public List<Project> getProjectsByTeam(UUID teamId) {
    return projectRepository.findProjectsByTeamId(teamId);
  }

  @Override
  public Project assignTeamToProject(UUID projectId, UUID teamId) {
    Optional<Project> optionalProject = projectRepository.findById(projectId);
    Optional<Team> optionalTeam = teamServiceImplementation.getTeamById(teamId);
    if (optionalProject.isEmpty() || optionalTeam.isEmpty()) {
      return null;
    }
    Project project = optionalProject.get();
    Team team = optionalTeam.get();
    project.setTeam(team);
    return projectRepository.save(project);
  }
}
