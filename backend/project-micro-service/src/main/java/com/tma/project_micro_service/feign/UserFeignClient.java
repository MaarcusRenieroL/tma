package com.tma.project_micro_service.feign;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.payload.request.AssignProjectToUsersRequest;
import com.tma.project_micro_service.payload.response.StandardResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "user-micro-service", path = "api/users")
public interface UserFeignClient {
  @GetMapping("project/{projectId}")
  List<User> getUsersByProjectId(@PathVariable UUID projectId);

  @PutMapping("/project")
  ResponseEntity<StandardResponse<Object>> assignProjectToUsers(
      @RequestBody AssignProjectToUsersRequest assignProjectToUserRequest,
      @RequestHeader("Authorization") String authToken);
}
