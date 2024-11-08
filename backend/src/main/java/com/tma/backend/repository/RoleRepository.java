package com.tma.backend.repository;

import com.tma.backend.model.AppRole;
import com.tma.backend.model.Role;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, UUID> {
  Optional<Role> findByRoleName(AppRole appRole);
}
