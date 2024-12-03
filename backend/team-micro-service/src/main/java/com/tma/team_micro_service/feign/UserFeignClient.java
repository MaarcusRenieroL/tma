package com.tma.team_micro_service.feign;

import com.tma.team_micro_service.dto.User;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-micro-service", path = "/api/users")
public interface UserFeignClient {
	@PostMapping("usersId")
	List<User> getAllUsersByIds(@RequestBody List<UUID> userIds);
	
	@PostMapping("/team/{teamId}")
	void addTeamToUser(@PathVariable UUID teamId, @RequestBody UUID userId, @RequestHeader("Authorization") String authToken);
	
	@GetMapping("/getTeams/{userId}")
	Set<UUID> getTeamsByUserId(@PathVariable UUID userId);
	
}
