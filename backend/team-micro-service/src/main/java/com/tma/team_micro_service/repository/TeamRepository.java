package com.tma.team_micro_service.repository;

import com.tma.team_micro_service.model.Team;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, UUID> {}
