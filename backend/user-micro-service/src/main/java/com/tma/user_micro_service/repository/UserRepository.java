package com.tma.user_micro_service.repository;

import com.tma.user_micro_service.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findByUserName(String username);

  Optional<User> findByEmail(String email);

  List<User> findByProjectIds(UUID projectId);

  List<User> findUsersByOrganizationId(UUID organizationId);
}
