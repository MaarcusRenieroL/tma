package com.tma.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Data;

@Entity
@Data
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
}
