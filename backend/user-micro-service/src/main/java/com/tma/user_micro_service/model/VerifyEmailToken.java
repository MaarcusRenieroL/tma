package com.tma.user_micro_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class VerifyEmailToken {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID verifyEmailTokenId;

  private int token;

  @OneToOne private User user;

  private LocalDateTime expiryDate;

  private boolean isTokenUsed;

  public VerifyEmailToken(User user, int token, LocalDateTime expiryDate, boolean isTokenUsed) {
    this.user = user;
    this.token = token;
    this.expiryDate = expiryDate;
    this.isTokenUsed = isTokenUsed;
  }
}
