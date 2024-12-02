package com.tma.team_micro_service.feign;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@FeignClient("USER-MICRO-SERVICE")
public interface TeamUserInterface {
	@PostMapping("api/users/usersId")
	List<User> getAllUsersByIds(@RequestBody List<UUID> userIds);


}
	
