package com.tma.project_micro_service.payload.request;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignProjectToUserRequest {
  private UUID projectId;
  private UUID userId;
}
