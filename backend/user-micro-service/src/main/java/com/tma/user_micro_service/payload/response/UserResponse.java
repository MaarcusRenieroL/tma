package com.tma.user_micro_service.payload.response;

import com.tma.user_micro_service.dto.TeamDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
	private UUID userId;
	private String username;
	private String name;
	private String email;
	private String location;
	private String role;
	
	private Set<UUID> teamIds;
}
