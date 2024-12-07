package com.tma.user_micro_service.payload.request;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyTokenRequest {
  private int token;
  private UUID userId;
}
