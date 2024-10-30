package com.tma.backend.repository;

import com.tma.backend.model.Task;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, UUID> {}
