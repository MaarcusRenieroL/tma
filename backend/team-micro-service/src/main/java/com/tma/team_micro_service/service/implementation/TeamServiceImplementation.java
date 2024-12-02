package com.tma.team_micro_service.service.implementation;

import com.tma.team_micro_service.dto.User;
import com.tma.team_micro_service.feign.UserFeignClient;
import com.tma.team_micro_service.model.Team;
import com.tma.team_micro_service.repository.TeamRepository;
import com.tma.team_micro_service.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TeamServiceImplementation implements TeamService {
	private final UserFeignClient userFeignClient;
	private final TeamRepository teamRepository;
	
	public TeamServiceImplementation(UserFeignClient userFeignClient, TeamRepository teamRepository) {
		this.userFeignClient = userFeignClient;
		this.teamRepository = teamRepository;
	}
	
	@Override
	public Team createTeam(Team team, UUID userId, HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			Set<UUID> userIds = new HashSet<>();
			
			userIds.add(userId);
			
			team.setUserIds(userIds);
			
			Team savedTeam = teamRepository.save(team);
			
			userFeignClient.addTeamToUser(savedTeam.getTeamId(), userId, bearerToken);
			
			
			return savedTeam;
		}
		
		return null;
	}
	
	@Override
	public Team getTeamById(UUID teamId) {
		return teamRepository.findById(teamId).orElse(null);
	}
	
	@Override
	public List<Team> getAllTeams() {
		return teamRepository.findAll();
	}
	
	@Override
	public Team updateTeam(UUID teamId, Team team) {
		if (!teamRepository.existsById(teamId)) {
			return null;
		}
		
		Optional<Team> optionalTeam = teamRepository.findById(teamId);
		
		if (optionalTeam.isPresent()) {
			Team existingTeam = optionalTeam.get();
			existingTeam.setTeamName(team.getTeamName());
			existingTeam.setTeamDescription(team.getTeamDescription());
			teamRepository.save(existingTeam);
			
			return existingTeam;
		}
		
		return null;
	}
	
	@Override
	public void deleteTeam(UUID teamId) {
		
		teamRepository.deleteById(teamId);
	}
	
	@Override
	public List<User> getAllUsersByIds(List<UUID> userIds) {
		return userFeignClient.getAllUsersByIds(userIds);
	}
	
	@Override
	public Set<UUID> getUserByTeamId(UUID teamId) {
		Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team Not Found"));
//    List<UUID> userIds=team.getUserIds();
		
		
		return team.getUserIds();
	}
	
	
}
