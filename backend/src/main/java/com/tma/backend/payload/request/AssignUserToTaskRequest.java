package com.tma.backend.payload.request;

import java.util.List;
import lombok.Data;

@Data
public class AssignUserToTaskRequest {
  private List<String> userIds;
}
