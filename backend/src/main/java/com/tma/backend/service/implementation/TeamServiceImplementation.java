package com.tma.backend.service.implementation;

import com.tma.backend.model.Role;
import com.tma.backend.model.Team;
import com.tma.backend.model.User;
import com.tma.backend.repository.TeamRepository;
import com.tma.backend.repository.UserRepository;
import com.tma.backend.service.TeamService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImplementation implements TeamService {

  @Autowired private TeamRepository teamRepository;
  @Autowired private UserRepository userRepository;

  @Override
  public Team createTeam(UUID userId, Team team) {
    Optional<User> optionalUser = userRepository.findById(userId);
    if (optionalUser.isEmpty()) {
      return null;
    }
    User user = optionalUser.get();
    user.setRole(Role.ADMIN);

    ArrayList<User> teamMembers = new ArrayList<>();

    teamMembers.add(user);

    team.setUsers(teamMembers);

    Team savedTeam = teamRepository.save(team);

    for (User teamMember : savedTeam.getUsers()) {
      System.out.println(teamMember.getEmail());
    }

    user.setTeam(savedTeam);
    userRepository.save(user);

    return savedTeam;
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
  public User addUserToTeam(UUID teamId, UUID userId) {
    Optional<Team> optionalTeam = teamRepository.findById(teamId);
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalTeam.isPresent() && optionalUser.isPresent()) {
      Team team = optionalTeam.get();
      User user = optionalUser.get();

      user.setTeam(team);

      return userRepository.save(user);
    }

    return null;
  }

  @Override
  public User removeUserFromTeam(UUID teamId, UUID userId) {
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      if (user.getTeam() != null && user.getTeam().getTeamId().equals(teamId)) {
        user.setTeam(null);
        return userRepository.save(user);
      }
    }
    return null;
  }
}
