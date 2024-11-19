package com.tma.project_micro_service.repository;

import com.tma.project_micro_service.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
//	@Query("SELECT p FROM Project p WHERE p.team.id = :teamId")
//	List<Project> findProjectsByTeamId(@RequestParam("teamId") UUID teamId);
	
	
}
