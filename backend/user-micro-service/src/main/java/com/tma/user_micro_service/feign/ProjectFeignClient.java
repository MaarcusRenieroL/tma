package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.payload.response.ProjectResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "project-micro-service", path = "/api/projects")
public interface ProjectFeignClient {

  @GetMapping("/{projectId}")
  ResponseEntity<StandardResponse<ProjectResponse>> getProjectById(@PathVariable UUID projectId);
}
