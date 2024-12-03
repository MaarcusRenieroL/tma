package com.tma.project_micro_service.repository;

import com.tma.project_micro_service.model.Project;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
		List<Project> findProjectsByTeamId(UUID teamId);

}
