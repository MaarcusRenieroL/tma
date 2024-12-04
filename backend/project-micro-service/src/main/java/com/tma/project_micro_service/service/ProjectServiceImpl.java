package com.tma.project_micro_service.service;

import com.tma.project_micro_service.feign.TeamFeignClient;
import com.tma.project_micro_service.model.Project;
import com.tma.project_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.project_micro_service.repository.ProjectRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {

  private final ProjectRepository projectRepository;
  private final TeamFeignClient teamFeignClient;

  public ProjectServiceImpl(ProjectRepository projectRepository, TeamFeignClient teamFeignClient) {
    this.projectRepository = projectRepository;
    this.teamFeignClient = teamFeignClient;
  }

  @Override
  public Project createProject(Project project, UUID teamId, HttpServletRequest request) {

    String bearerToken = request.getHeader("Authorization");

    log.info("JWT: {}", bearerToken);

    if (bearerToken == null) {
      return null;
    }

    if (project.getTeamId() == null) {
      project.setTeamId(teamId);
    }

    Project savedProject = projectRepository.save(project);

    teamFeignClient.assignProjectToTeam(
        new AssignProjectToTeamRequest(savedProject.getProjectId(), teamId), bearerToken);

    return savedProject;
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
  public List<Project> getProjectsByTeamId(UUID teamId) {
    return projectRepository.findProjectsByTeamId(teamId);
  }

  //	@Override
  //	public Project assignTeamToProject(UUID projectId, UUID teamId) {
  //		Optional<Project> optionalProject = projectRepository.findById(projectId);
  //		Optional<Team> optionalTeam = teamService.getTeamById(teamId);
  //		if (optionalProject.isEmpty() || optionalTeam.isEmpty()) {
  //			return null;
  //		}
  //		Project project = optionalProject.get();
  //		Team team = optionalTeam.get();
  //		project.setTeam(team);
  //		return projectRepository.save(project);
  //
  //	}

}
