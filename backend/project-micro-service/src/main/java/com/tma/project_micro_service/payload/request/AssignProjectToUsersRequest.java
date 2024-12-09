package com.tma.project_micro_service.payload.request;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssignProjectToUsersRequest {
  private UUID projectId;
  private List<UUID> userIds;
}
