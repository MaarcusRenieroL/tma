package com.tma.user_micro_service.payload.response;

import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {

  private UUID taskId;

  private String title;

  private String description;

  private LocalDate dueDate;

  private LocalDate dateAllocated;

  private String priority;

  private String status;

  private UUID projectId;

  private UUID teamId;
}
