package com.tma.task_micro_service.repository;

import com.tma.task_micro_service.model.Task;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, UUID> {}
