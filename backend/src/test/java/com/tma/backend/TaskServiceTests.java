package com.tma.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.tma.backend.model.Priority;
import com.tma.backend.model.Status;
import com.tma.backend.model.Task;
import com.tma.backend.repository.TaskRepository;
import com.tma.backend.service.TaskServiceImpl;
import java.time.LocalDate;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class TaskServiceTests {

  @Mock private TaskRepository taskRepo;

  @InjectMocks private TaskServiceImpl taskService;

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
  void getAllTasks_ReturnListOfTasks() {
    when(taskRepo.findAll()).thenReturn(Collections.singletonList(task));

    List<Task> tasks = taskService.getAllTasks();

    assertNotNull(tasks);
    assertEquals(1, tasks.size());
    assertEquals("Complete Documentation", tasks.get(0).getTitle());
  }

  @Test
  void createTask_ShouldReturnCreatedTask() {
    when(taskRepo.save(any(Task.class))).thenReturn(task);

    Task createdTask = taskService.createTask(task);

    assertNotNull(createdTask);
    assertEquals("Complete Documentation", createdTask.getTitle());
  }

  @Test
  void updateTask_ExistingTask_ShouldReturnUpdatedTask() {
    when(taskRepo.existsById(taskId)).thenReturn(true);
    when(taskRepo.findById(taskId)).thenReturn(Optional.of(task));
    when(taskRepo.save(any(Task.class))).thenReturn(task);

    task.setTitle("Update Documentation");
    Task updatedTask = taskService.updateTask(taskId, task);

    assertNotNull(updatedTask);
    assertEquals("Update Documentation", updatedTask.getTitle());
    verify(taskRepo, times(1)).save(task);
  }

  @Test
  void updateTask_NonExistingTask_ShouldReturnNull() {
    when(taskRepo.existsById(taskId)).thenReturn(false);

    Task updatedTask = taskService.updateTask(taskId, task);

    assertNull(updatedTask);
    verify(taskRepo, never()).save(any(Task.class));
  }

  @Test
  void deleteTask_ShouldInvokeDeleteMethod() {
    taskService.deleteTask(taskId);

    verify(taskRepo, times(1)).deleteById(taskId);
  }

  @Test
  void getTaskById_ExistingTask_ShouldReturnTask() {
    when(taskRepo.findById(taskId)).thenReturn(Optional.of(task));

    Task foundTask = taskService.getTaskById(taskId);

    assertNotNull(foundTask);
    assertEquals("Complete Documentation", foundTask.getTitle());
  }

  @Test
  void getTaskById_NonExistingTask_ShouldReturnNull() {
    when(taskRepo.findById(taskId)).thenReturn(Optional.empty());

    Task foundTask = taskService.getTaskById(taskId);

    assertNull(foundTask);
  }
}
