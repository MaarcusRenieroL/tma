package com.tma.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tma.backend.controller.ProjectController;
import com.tma.backend.model.Project;
import com.tma.backend.service.ProjectServiceImpl;
import com.tma.backend.util.ResponseUtil;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProjectController.class)
public class ProjectControllerTests {

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @MockBean private ProjectServiceImpl projectService;

  @MockBean private ResponseUtil responseUtil;

  private Project project;
  private UUID projectId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    projectId = UUID.randomUUID();
    project = new Project(projectId, "Capstone Project", "Create a fullstack webapp");
  }

  @Test
  void getAllProjects_NoProjectsFound_ShouldReturnNotFound() throws Exception {
    when(projectService.getAllProjects()).thenReturn(Collections.emptyList());

    mockMvc
        .perform(get("/api/project").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("No Project found"));

    verify(projectService, times(1)).getAllProjects();
  }

  @Test
  void getAllProjects_ProjectsFound_ShouldReturnOk() throws Exception {
    when(projectService.getAllProjects()).thenReturn(List.of(project));

    mockMvc
        .perform(get("/api/project").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Projects retrieved successfully"))
        .andExpect(jsonPath("$.data[0].projectTitle").value("Capstone Project"));

    verify(projectService, times(1)).getAllProjects();
  }

  @Test
  void createProject_ValidProject_ShouldReturnCreated() throws Exception {
    when(projectService.createProject(any(Project.class))).thenReturn(project);

    mockMvc
        .perform(
            post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(project)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.message").value("Project created successfully"))
        .andExpect(jsonPath("$.data.projectTitle").value("Capstone Project"));

    verify(projectService, times(1)).createProject(any(Project.class));
  }

  @Test
  void createProject_MissingFields_ShouldReturnBadRequest() throws Exception {
    project.setProjectTitle(null); // Missing required project title field

    mockMvc
        .perform(
            post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(project)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Missing required fields"));

    verify(projectService, never()).createProject(any(Project.class));
  }

  @Test
  void getProjectById_ProjectFound_ShouldReturnOk() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(project);

    mockMvc
        .perform(get("/api/project/{id}", projectId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Project retrieved successfully"))
        .andExpect(jsonPath("$.data.projectTitle").value("Capstone Project"));

    verify(projectService, times(1)).getProjectById(projectId);
  }

  @Test
  void getProjectById_ProjectNotFound_ShouldReturnNotFound() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(null);

    mockMvc
        .perform(get("/api/project/{id}", projectId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Project not found"));

    verify(projectService, times(1)).getProjectById(projectId);
  }

  @Test
  void updateProject_ValidProject_ShouldReturnOk() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(project);
    when(projectService.updateProject(eq(projectId), any(Project.class))).thenReturn(project);

    mockMvc
        .perform(
            put("/api/project/{id}", projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(project)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Project updated successfully"))
        .andExpect(jsonPath("$.data.projectTitle").value("Capstone Project"));

    verify(projectService, times(1)).updateProject(eq(projectId), any(Project.class));
  }

  @Test
  void updateProject_ProjectNotFound_ShouldReturnNotFound() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(null);

    mockMvc
        .perform(
            put("/api/project/{id}", projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(project)))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Project not found for update"));

    verify(projectService, never()).updateProject(eq(projectId), any(Project.class));
  }

  @Test
  void deleteProject_ProjectFound_ShouldReturnNoContent() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(project);

    mockMvc
        .perform(delete("/api/project/{id}", projectId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(projectService, times(1)).deleteProject(projectId);
  }

  @Test
  void deleteProject_ProjectNotFound_ShouldReturnNotFound() throws Exception {
    when(projectService.getProjectById(projectId)).thenReturn(null);

    mockMvc
        .perform(delete("/api/project/{id}", projectId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Project not found with ID: " + projectId));

    verify(projectService, never()).deleteProject(projectId);
  }
}
