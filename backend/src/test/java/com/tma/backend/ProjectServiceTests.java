package com.tma.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.tma.backend.model.Project;
import com.tma.backend.repository.ProjectRepository;
import com.tma.backend.service.ProjectServiceImpl;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class ProjectServiceTests {

  @Mock private ProjectRepository projectRepo;

  @InjectMocks private ProjectServiceImpl projectService;

  private Project project;
  private UUID projectId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    projectId = UUID.randomUUID();
    project = new Project(projectId, "Capstone Project", "Create a fullstack webapp");
  }

  @Test
  void getAllProjects_ShouldReturnListOfProjects() {
    when(projectRepo.findAll()).thenReturn(Collections.singletonList(project));

    List<Project> projects = projectService.getAllProjects();

    assertNotNull(projects);
    assertEquals(1, projects.size());
    assertEquals("Capstone Project", projects.get(0).getProjectTitle());
  }

  @Test
  void createProject_ShouldReturnCreatedProject() {
    when(projectRepo.save(any(Project.class))).thenReturn(project);

    Project createdProject = projectService.createProject(project);

    assertNotNull(createdProject);
    assertEquals("Capstone Project", createdProject.getProjectTitle());
  }

  @Test
  void updateProject_ExistingProject_ShouldReturnUpdatedProject() {
    when(projectRepo.existsById(projectId)).thenReturn(true);
    when(projectRepo.findById(projectId)).thenReturn(Optional.of(project));
    when(projectRepo.save(any(Project.class))).thenReturn(project);

    Project updatedProject = projectService.updateProject(projectId, project);

    assertNotNull(updatedProject);
    assertEquals("Capstone Project", updatedProject.getProjectTitle());
    verify(projectRepo, times(1)).save(project);
  }

  @Test
  void updateProject_NonExistingProject_ShouldReturnNull() {
    when(projectRepo.existsById(projectId)).thenReturn(false);

    Project updatedProject = projectService.updateProject(projectId, project);

    assertNull(updatedProject);
    verify(projectRepo, never()).save(any(Project.class));
  }

  @Test
  void deleteProject_ShouldInvokeDeleteMethod() {
    projectService.deleteProject(projectId);

    verify(projectRepo, times(1)).deleteById(projectId);
  }

  @Test
  void getProjectById_ExistingProject_ShouldReturnProject() {
    when(projectRepo.findById(projectId)).thenReturn(Optional.of(project));

    Project foundProject = projectService.getProjectById(projectId);

    assertNotNull(foundProject);
    assertEquals("Capstone Project", foundProject.getProjectTitle());
  }

  @Test
  void getProjectById_NonExistingProject_ShouldReturnNull() {
    when(projectRepo.findById(projectId)).thenReturn(Optional.empty());

    Project foundProject = projectService.getProjectById(projectId);

    assertNull(foundProject);
  }
}
