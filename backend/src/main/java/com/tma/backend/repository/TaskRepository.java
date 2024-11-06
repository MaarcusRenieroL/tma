package com.tma.backend.repository;

import com.tma.backend.model.Task;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

public interface TaskRepository extends JpaRepository<Task, UUID> {

  @Query("SELECT t FROM Task t WHERE t.team.id = :teamId")
  List<Task> findTaskByTeamId(UUID teamId);

  @Query("SELECT t FROM Task t JOIN t.users u WHERE u.id = :userId")
  List<Task> findTaskByUserId(@RequestParam("userId") UUID userId);
}
