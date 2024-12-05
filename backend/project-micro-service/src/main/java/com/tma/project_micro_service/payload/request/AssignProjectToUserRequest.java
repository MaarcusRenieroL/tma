package com.tma.project_micro_service.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignProjectToUserRequest {
  private UUID projectId;
  private UUID userId;
}
