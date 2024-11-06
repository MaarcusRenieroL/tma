package com.tma.backend.repository;

import com.tma.backend.model.Project;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProjectRepository extends JpaRepository<Project, UUID> {

  @Query("SELECT p FROM Project p WHERE p.team.id = :teamId")
  List<Project> findProjectsByTeamId(@RequestParam("teamId") UUID teamId);
}
