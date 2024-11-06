package com.tma.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
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

  @ManyToOne
  @JoinColumn(name = "teamId")
  @JsonIgnore
  private Team team;

  @ManyToOne
  @JoinColumn(name = "projectId")
  @JsonIgnore
  private Project project;

  @ManyToMany
  @JoinTable(
      name = "user_task",
      joinColumns = @JoinColumn(name = "taskId"),
      inverseJoinColumns = @JoinColumn(name = "userId"))
  @JsonIgnoreProperties("tasks")
  private List<User> users;
}
