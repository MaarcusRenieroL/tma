package com.tma.task_micro_service.payload.request;

import com.tma.task_micro_service.model.Task;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequest {
  private Task task;
  private List<UUID> userIds;
}
