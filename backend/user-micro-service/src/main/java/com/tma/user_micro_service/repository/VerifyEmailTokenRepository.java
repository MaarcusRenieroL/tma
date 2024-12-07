package com.tma.user_micro_service.repository;

import com.tma.user_micro_service.model.VerifyEmailToken;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyEmailTokenRepository extends JpaRepository<VerifyEmailToken, UUID> {
  Optional<VerifyEmailToken> findByUser_UserId(UUID userId);
}
