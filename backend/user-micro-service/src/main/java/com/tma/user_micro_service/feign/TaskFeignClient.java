package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.TaskResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "task-micro-service", path = "/api/tasks/")
public interface TaskFeignClient {

  @GetMapping("/{taskId}")
  ResponseEntity<StandardResponse<TaskResponse>> getTaskById(
      @PathVariable UUID taskId, HttpServletRequest request);
}
