package com.tma.task_micro_service.feign;

import com.tma.task_micro_service.payload.response.StandardResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-micro-service", path = "/api/users")
public interface UserFeignClient {

  @PostMapping("/task/{taskId}")
  ResponseEntity<StandardResponse<Object>> addTaskToUsers(
      @PathVariable UUID taskId,
      @RequestBody List<UUID> userIds,
      @RequestHeader("Authorization") String authToken);
}
