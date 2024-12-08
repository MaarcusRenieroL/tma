package com.tma.user_micro_service.repository;

import com.tma.user_micro_service.model.SetupAccountToken;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetupAccountTokenRepository extends JpaRepository<SetupAccountToken, UUID> {
  Optional<SetupAccountToken> findSetupAccountTokenByUser_UserId(UUID userId);
}
