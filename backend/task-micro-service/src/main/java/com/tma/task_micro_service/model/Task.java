package com.tma.task_micro_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID taskId;

  private String title;

  private String description;

  private Status status;

  private LocalDate dateAllocated;

  private LocalDate dueDate;

  private Priority priority;

  private UUID projectId;

  private UUID teamId;

  @ElementCollection private Set<UUID> userIds;
}
