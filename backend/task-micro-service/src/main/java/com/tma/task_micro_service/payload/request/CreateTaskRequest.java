package com.tma.task_micro_service.payload.request;

import com.tma.task_micro_service.model.Task;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequest {
  private Task task;
  private UUID userId;
}
