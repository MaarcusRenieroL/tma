package com.tma.project_micro_service.feign;


import com.tma.project_micro_service.dto.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.UUID;

@FeignClient(name="user-micro-service", path = "api/users")
public interface UserFeignClient {
	@GetMapping("project/{projectId}")
	List<User> getUsersByProjectId(@PathVariable UUID projectId);
	
}
