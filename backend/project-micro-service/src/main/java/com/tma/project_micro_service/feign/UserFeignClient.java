package com.tma.project_micro_service.feign;

import com.tma.project_micro_service.dto.User;
import com.tma.project_micro_service.payload.request.AssignProjectToUserRequest;
import com.tma.project_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

@FeignClient(name="user-micro-service", path = "api/users")
public interface UserFeignClient {
	@GetMapping("project/{projectId}")
	List<User> getUsersByProjectId(@PathVariable UUID projectId);
	
	@PostMapping("/project")
	ResponseEntity<StandardResponse<Object>> assignProjectToUser(@RequestBody
 AssignProjectToUserRequest assignProjectToUserRequest, @RequestHeader("Authorization") String authToken);
	
}

