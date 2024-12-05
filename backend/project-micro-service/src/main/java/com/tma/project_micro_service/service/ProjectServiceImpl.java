package com.tma.project_micro_service.service;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.feign.TeamFeignClient;
import com.tma.project_micro_service.feign.UserFeignClient;
import com.tma.project_micro_service.model.Project;
import com.tma.project_micro_service.payload.request.AssignProjectToTeamRequest;
import com.tma.project_micro_service.payload.request.AssignProjectToUserRequest;
import com.tma.project_micro_service.repository.ProjectRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
  public Project createProject(
      Project project, UUID teamId, UUID userId, HttpServletRequest request) {

    String bearerToken = request.getHeader("Authorization");
    //
    log.info("JWT: {}", bearerToken);

    if (bearerToken == null) {
      return null;
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

    Project savedProject = projectRepository.save(project);

    teamFeignClient.assignProjectToTeam(
        new AssignProjectToTeamRequest(savedProject.getProjectId(), teamId), bearerToken);
    userFeignClient.assignProjectToUser(
        new AssignProjectToUserRequest(savedProject.getProjectId(), userId), bearerToken);

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

  @Override
  public List<User> getUsersForProject(UUID projectId) {
    return userFeignClient.getUsersByProjectId(projectId);
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
