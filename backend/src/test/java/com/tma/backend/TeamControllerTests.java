package com.tma.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tma.backend.controller.TeamController;
import com.tma.backend.model.Team;
import com.tma.backend.service.TeamService;
import com.tma.backend.util.ResponseUtil;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(TeamController.class)
public class TeamControllerTests {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private TeamService teamService;

  @MockBean private ResponseUtil<Team> responseUtil;

  private Team team;
  private UUID teamId;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    teamId = UUID.randomUUID();
    team = new Team(teamId, "Development Team", "Handles development tasks");
  }

  @Test
  void getAllTeams_NoTeamsFound_ShouldReturnNotFound() throws Exception {
    when(teamService.getAllTeams()).thenReturn(Collections.emptyList());
    mockMvc
        .perform(get("/api/team").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("No teams found"));

    verify(teamService, times(1)).getAllTeams();
  }

  @Test
  void getAllTeams_TeamsFound_ShouldReturnOk() throws Exception {
    when(teamService.getAllTeams()).thenReturn(List.of(team));

    mockMvc
        .perform(get("/api/team").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Teams retrieved successfully"))
        .andExpect(jsonPath("$.data[0].teamName").value("Development Team"));

    verify(teamService, times(1)).getAllTeams();
  }

  @Test
  void getTeamById_TeamFound_ShouldReturnOk() throws Exception {
    when(teamService.getTeamById(teamId)).thenReturn(team);

    mockMvc
        .perform(get("/api/team/{id}", teamId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Team retrieved successfully"))
        .andExpect(jsonPath("$.data.teamName").value("Development Team"));

    verify(teamService, times(1)).getTeamById(teamId);
  }

  @Test
  void getTeamById_TeamNotFound_ShouldReturnNotFound() throws Exception {
    when(teamService.getTeamById(teamId)).thenReturn(null);
    mockMvc
        .perform(get("/api/team/{id}", teamId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Team not found"));

    verify(teamService, times(1)).getTeamById(teamId);
  }

  @Test
  void createTeam_ValidTeam_ShouldReturnCreated() throws Exception {
    when(teamService.createTeam(any(Team.class))).thenReturn(team);

    mockMvc
        .perform(
            post("/api/team")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(team)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.message").value("Team created successfully"))
        .andExpect(jsonPath("$.data.teamName").value("Development Team"));

    verify(teamService, times(1)).createTeam(any(Team.class));
  }

  @Test
  void createTeam_MissingFields_ShouldReturnBadRequest() throws Exception {
    team.setTeamName(null); // Missing required team name
    mockMvc
        .perform(
            post("/api/team")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(team)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.message").value("Missing required fields"));

    verify(teamService, never()).createTeam(any(Team.class));
  }

  @Test
  void updateTeam_TeamFound_ShouldReturnOk() throws Exception {
    when(teamService.updateTeam(eq(teamId), any(Team.class))).thenReturn(team);

    mockMvc
        .perform(
            put("/api/team/{id}", teamId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(team)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value("Team updated successfully"))
        .andExpect(jsonPath("$.data.teamName").value("Development Team"));

    verify(teamService, times(1)).updateTeam(eq(teamId), any(Team.class));
  }

  @Test
  void updateTeam_TeamNotFound_ShouldReturnNotFound() throws Exception {
    when(teamService.updateTeam(eq(teamId), any(Team.class))).thenReturn(null);

    mockMvc
        .perform(
            put("/api/team/{id}", teamId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(team)))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Team not found for update"));

    verify(teamService, times(1)).updateTeam(eq(teamId), any(Team.class));
  }

  @Test
  void deleteTeam_TeamFound_ShouldReturnNoContent() throws Exception {
    when(teamService.getTeamById(teamId)).thenReturn(team);
    mockMvc
        .perform(delete("/api/team/{id}", teamId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNoContent());

    verify(teamService, times(1)).deleteTeam(teamId);
  }

  @Test
  void deleteTeam_TeamNotFound_ShouldReturnNotFound() throws Exception {
    when(teamService.getTeamById(teamId)).thenReturn(null);

    mockMvc
        .perform(delete("/api/team/{id}", teamId).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("Team not found with ID: " + teamId));

    verify(teamService, never()).deleteTeam(teamId);
  }
}
