package com.tma.project_micro_service.payload.request;

import com.tma.project_micro_service.model.Project;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectRequest {
  private Project project;
  private UUID teamId;
  private UUID userId;
  private UUID organizationId;
}
