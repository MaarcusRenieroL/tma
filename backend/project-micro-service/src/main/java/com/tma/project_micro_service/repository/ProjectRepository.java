package com.tma.project_micro_service.repository;

import com.tma.project_micro_service.model.Project;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
  //	@Query("SELECT p FROM Project p WHERE p.team.id = :teamId")
  //	List<Project> findProjectsByTeamId(@RequestParam("teamId") UUID teamId);

}
