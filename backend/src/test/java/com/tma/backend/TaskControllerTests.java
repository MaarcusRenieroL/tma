package com.tma.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tma.backend.controller.TaskController;
import com.tma.backend.model.Priority;
import com.tma.backend.model.Status;
import com.tma.backend.model.Task;
import com.tma.backend.service.TaskServiceImpl;
import com.tma.backend.util.ResponseUtil;
import java.time.LocalDate;
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

@WebMvcTest(TaskController.class)
public class TaskControllerTests {

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @MockBean private TaskServiceImpl taskService;
  @MockBean private ResponseUtil responseUtil;

  private Task task;
  private UUID taskId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    taskId = UUID.randomUUID();
    task =
        new Task(
            taskId,
            "Complete Documentation",
            "Finish all pending documentation tasks",
            Status.IN_PROGRESS,
            LocalDate.now(),
            LocalDate.of(2024, 12, 25),
            Priority.MEDIUM);
  }

  @Test
  void getAllTasks_NoTasksFound_ShouldReturnNotFound() throws Exception {
    when(taskService.getAllTasks()).thenReturn(Collections.emptyList());

    mockMvc
        .perform(get("/api/tasks").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("No tasks found"));

    verify(taskService, times(1)).getAllTasks();
  }

  @Test
  void getAllTasks_TasksFound_ShouldReturnOk() throws Exception {
    when(taskService.getAllTasks()).thenReturn(List.of(task));

    mockMvc
        .perform(get("/api/tasks").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Tasks retrieved successfully"))
        .andExpect(jsonPath("$.data[0].title").value("Complete Documentation"));

    verify(taskService, times(1)).getAllTasks();
  }

  @Test
  void createTask_ValidTask_ShouldReturnCreated() throws Exception {
    when(taskService.createTask(any(Task.class))).thenReturn(task);

    mockMvc
        .perform(
            post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.message").value("Task created successfully"))
        .andExpect(jsonPath("$.data.title").value("Complete Documentation"));

    verify(taskService, times(1)).createTask(any(Task.class));
  }

  @Test
  void createTask_MissingFields_ShouldReturnBadRequest() throws Exception {
    task.setTitle(null); // Missing required title field

    mockMvc
        .perform(
            post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Missing required fields"));

    verify(taskService, never()).createTask(any(Task.class));
  }

  @Test
  void getTaskById_TaskFound_ShouldReturnOk() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(task);

    mockMvc
        .perform(get("/api/tasks/{taskId}", taskId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Task retrieved successfully"))
        .andExpect(jsonPath("$.data.title").value("Complete Documentation"));

    verify(taskService, times(1)).getTaskById(taskId);
  }

  @Test
  void getTaskById_TaskNotFound_ShouldReturnNotFound() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(null);

    mockMvc
        .perform(get("/api/tasks/{taskId}", taskId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Task not found with ID: " + taskId));

    verify(taskService, times(1)).getTaskById(taskId);
  }

  @Test
  void updateTask_ValidTask_ShouldReturnOk() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(task);
    when(taskService.updateTask(eq(taskId), any(Task.class))).thenReturn(task);

    mockMvc
        .perform(
            put("/api/tasks/{taskId}", taskId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Task updated successfully"))
        .andExpect(jsonPath("$.data.title").value("Complete Documentation"));

    verify(taskService, times(1)).updateTask(eq(taskId), any(Task.class));
  }

  @Test
  void updateTask_TaskNotFound_ShouldReturnNotFound() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(null);

    mockMvc
        .perform(
            put("/api/tasks/{taskId}", taskId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Task not found with ID: " + taskId));

    verify(taskService, never()).updateTask(eq(taskId), any(Task.class));
  }

  @Test
  void deleteTask_TaskFound_ShouldReturnNoContent() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(task);

    mockMvc
        .perform(delete("/api/tasks/{taskId}", taskId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(taskService, times(1)).deleteTask(taskId);
  }

  @Test
  void deleteTask_TaskNotFound_ShouldReturnNotFound() throws Exception {
    when(taskService.getTaskById(taskId)).thenReturn(null);

    mockMvc
        .perform(delete("/api/tasks/{taskId}", taskId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Task not found with ID: " + taskId));

    verify(taskService, never()).deleteTask(taskId);
  }
}
