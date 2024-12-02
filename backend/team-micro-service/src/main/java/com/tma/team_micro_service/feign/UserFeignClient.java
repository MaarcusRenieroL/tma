package com.tma.team_micro_service.feign;

import com.tma.team_micro_service.dto.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "user-micro-service", path = "/api/users")
public interface UserFeignClient {
	@PostMapping("usersId")
	List<User> getAllUsersByIds(@RequestBody List<UUID> userIds);
	
	@PostMapping("/team/{teamId}")
	void addTeamToUser(@PathVariable UUID teamId, @RequestBody UUID userId, @RequestHeader("Authorization") String authToken);
}
	
