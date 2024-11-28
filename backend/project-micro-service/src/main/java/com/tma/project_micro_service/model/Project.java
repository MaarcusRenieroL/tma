package com.tma.project_micro_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID projectId;
  
  private String projectTitle;
  private String projectDescription;
  
//  @ManyToOne
//  @JoinColumn(name="teamId")
//  @JsonIgnore
//  private Team team;
  
//  @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//  @JsonIgnore // Keep this as ignore if you don't want to serialize tasks in project
//  private List<Task> tasks;
}
