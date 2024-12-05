package com.tma.project_micro_service.feign;

import com.tma.project_micro_service.dto.User;
import java.util.List;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-micro-service", path = "api/users")
public interface UserFeignClient {
  @GetMapping("project/{projectId}")
  List<User> getUsersByProjectId(@PathVariable UUID projectId);
}
