package com.tma.user_micro_service.repository;

import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.Role;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {
  Optional<Role> findByRoleName(AppRole appRole);
}
