package com.tma.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.tma.backend.model.Team;
import com.tma.backend.repository.TeamRepository;
import com.tma.backend.service.TeamServiceImpl;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class TeamServiceTests {

  @Mock private TeamRepository teamRepo;

  @InjectMocks private TeamServiceImpl teamService;

  private Team team;
  private UUID teamId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    teamId = UUID.randomUUID();
    team = new Team(teamId, "Development Team", "Responsible for development tasks");
  }

  @Test
  void createTeam_ShouldReturnCreatedTeam() {
    when(teamRepo.save(any(Team.class))).thenReturn(team);

    Team createdTeam = teamService.createTeam(team);

    assertNotNull(createdTeam);
    assertEquals("Development Team", createdTeam.getTeamName());
    verify(teamRepo, times(1)).save(team);
  }

  @Test
  void getTeamById_TeamExists_ShouldReturnTeam() {
    when(teamRepo.findById(teamId)).thenReturn(Optional.of(team));

    Team foundTeam = teamService.getTeamById(teamId);

    assertNotNull(foundTeam);
    assertEquals("Development Team", foundTeam.getTeamName());
    verify(teamRepo, times(1)).findById(teamId);
  }

  @Test
  void getTeamById_TeamNotExists_ShouldReturnNull() {
    when(teamRepo.findById(teamId)).thenReturn(Optional.empty());

    Team foundTeam = teamService.getTeamById(teamId);

    assertNull(foundTeam);
    verify(teamRepo, times(1)).findById(teamId);
  }

  @Test
  void getAllTeams_ShouldReturnListOfTeams() {
    when(teamRepo.findAll()).thenReturn(Collections.singletonList(team));

    List<Team> teams = teamService.getAllTeams();

    assertNotNull(teams);
    assertEquals(1, teams.size());
    assertEquals("Development Team", teams.get(0).getTeamName());
    verify(teamRepo, times(1)).findAll();
  }

  @Test
  void updateTeam_TeamExists_ShouldReturnUpdatedTeam() {
    when(teamRepo.existsById(teamId)).thenReturn(true);
    when(teamRepo.findById(teamId)).thenReturn(Optional.of(team));
    when(teamRepo.save(any(Team.class))).thenReturn(team);

    Team updatedTeam = teamService.updateTeam(teamId, team);

    assertNotNull(updatedTeam);
    assertEquals("Development Team", updatedTeam.getTeamName());
    verify(teamRepo, times(1)).save(team);
  }

  @Test
  void updateTeam_TeamNotExists_ShouldReturnNull() {
    when(teamRepo.existsById(teamId)).thenReturn(false);

    Team updatedTeam = teamService.updateTeam(teamId, team);

    assertNull(updatedTeam);
    verify(teamRepo, never()).save(any(Team.class));
  }

  @Test
  void deleteTeam_ShouldInvokeDeleteMethod() {
    teamService.deleteTeam(teamId);

    verify(teamRepo, times(1)).deleteById(teamId);
  }
}
