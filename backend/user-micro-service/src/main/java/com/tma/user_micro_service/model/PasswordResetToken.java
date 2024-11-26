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
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID passwordResetTokenId;

  private UUID token;

  @OneToOne private User user;

  private LocalDateTime expiryDate;

  private boolean isTokenUsed;

  public PasswordResetToken(User user, UUID token, LocalDateTime expiryDate, boolean isTokenUsed) {
    this.user = user;
    this.token = token;
    this.expiryDate = expiryDate;
    this.isTokenUsed = isTokenUsed;
  }
}
