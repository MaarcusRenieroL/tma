package com.tma.user_micro_service.service.implementation;

import com.tma.user_micro_service.dto.TeamDto;
import com.tma.user_micro_service.feign.OrganizationFeignClient;
import com.tma.user_micro_service.feign.TeamFeignClient;
import com.tma.user_micro_service.model.AppRole;
import com.tma.user_micro_service.model.Role;
import com.tma.user_micro_service.model.SetupAccountToken;
import com.tma.user_micro_service.model.User;
import com.tma.user_micro_service.payload.request.AddUserToOrganization;
import com.tma.user_micro_service.payload.request.InviteUsersToOrganizationRequest;
import com.tma.user_micro_service.payload.response.StandardResponse;
import com.tma.user_micro_service.payload.response.UserResponse;
import com.tma.user_micro_service.repository.RoleRepository;
import com.tma.user_micro_service.repository.SetupAccountTokenRepository;
import com.tma.user_micro_service.repository.UserRepository;
import com.tma.user_micro_service.service.UserService;
import com.tma.user_micro_service.util.ResponseUtil;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Slf4j
@Service
public class UserServiceImplementation implements UserService {

  private final UserRepository userRepository;
  private final TeamFeignClient teamFeignClient;
  private final RoleRepository roleRepository;
  private final SesClient sesClient;
  private final OrganizationFeignClient organizationFeignClient;
  private final SetupAccountTokenRepository setupAccountTokenRepository;

  Dotenv dotenv = Dotenv.load();

  public UserServiceImplementation(
      UserRepository userRepository,
      TeamFeignClient teamFeignClient,
      RoleRepository roleRepository,
      SesClient sesClient,
      OrganizationFeignClient organizationFeignClient,
      SetupAccountTokenRepository setupAccountTokenRepository) {
    this.teamFeignClient = teamFeignClient;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.sesClient = sesClient;
    this.organizationFeignClient = organizationFeignClient;
    this.setupAccountTokenRepository = setupAccountTokenRepository;
  }

  @Override
  public ResponseEntity<StandardResponse<List<User>>> getAllUsers(HttpServletRequest request) {
    List<User> users = userRepository.findAll();

    if (users.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "No users found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Users retrieved successfully", users, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<User>> createUser(User user, HttpServletRequest request) {
    try {

      if (user.getName() == null || user.getEmail() == null || user.getLocation() == null) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
      }

      User createdUser = userRepository.save(user);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "User created successfully",
          createdUser,
          request,
          LocalDateTime.now());
    } catch (Exception e) {

      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "An error occurred while creating the user",
          request,
          LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<User>> updateUser(
      UUID userId, User user, HttpServletRequest request) {
    if (user == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }
    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User Not Found", request, LocalDateTime.now());
    }
    User existingUser = optionalUser.get();
    existingUser.setName(user.getName());
    existingUser.setRole(user.getRole());
    existingUser.setEmail(user.getEmail());
    existingUser.setLocation(user.getLocation());
    existingUser.setPassword(user.getPassword());

    userRepository.save(existingUser);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "User updated successfully", existingUser, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<User>> deleteUser(
      UUID userId, HttpServletRequest request) {
    if (userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    User existingUser = userRepository.findById(userId).orElse(null);

    if (existingUser == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User not found", request, LocalDateTime.now());
    }

    userRepository.deleteById(userId);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "User deleted successfully", null, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<User>> getUserById(
      UUID userId, HttpServletRequest request) {
    if (userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "User ID is required", request, LocalDateTime.now());
    }

    User user = userRepository.findById(userId).orElse(null);

    if (user == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User not found with ID: " + userId, request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "User retrieved successfully", user, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<UserResponse>>> getAllUsersByIds(
      List<UUID> userIds, HttpServletRequest request) {

    List<UserResponse> users = new ArrayList<>();

    for (UUID id : userIds) {
      Optional<User> optionalUser = userRepository.findById(id);

      if (optionalUser.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.NOT_FOUND, "User not found with ID: " + id, request, LocalDateTime.now());
      }

      User existingUser = optionalUser.get();
      UserResponse userResponse =
          new UserResponse(
              existingUser.getUserId(),
              existingUser.getUserName(),
              existingUser.getName(),
              existingUser.getEmail(),
              existingUser.getLocation(),
              existingUser.getRole().getRoleName().toString());

      users.add(userResponse);
    }

    // Return success response with the list of users
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Users retrieved successfully", users, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Set<UUID>>> getUsersInTeam(
      UUID teamId, HttpServletRequest request) {

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Users found successfully",
        teamFeignClient.getUsersByTeamId(teamId),
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Object>> addUserToTeam(
      UUID teamId, UUID userId, HttpServletRequest request) {
    if (teamId == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    Optional<User> optionalUser = userRepository.findById(userId);

    if (optionalUser.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User not found with ID: " + userId, request, LocalDateTime.now());
    }

    User existingUser = optionalUser.get();

    if (existingUser.getTeamIds() != null) {
      existingUser.getTeamIds().add(teamId);
    } else {
      Set<UUID> teamIds = new HashSet<>();
      teamIds.add(teamId);
      existingUser.setTeamIds(teamIds);
    }

    userRepository.save(existingUser);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "User has been added to the team successfully",
        null,
        request,
        LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<TeamDto>>> getTeamsByUserId(
      UUID userId, HttpServletRequest request) {

    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "User not found with ID: " + userId, request, LocalDateTime.now());
    }

    Set<UUID> userTeams = user.getTeamIds();
    List<TeamDto> teams = new ArrayList<>();

    for (UUID teamId : userTeams) {
      TeamDto teamDto = Objects.requireNonNull(teamFeignClient.getTeamById(teamId)).getData();
      if (teamDto != null) {
        teams.add(teamDto);
      }
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Teams retrieved successfully", teams, request, LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Object>> removeUserFromTeam(
      UUID teamId, UUID userId, HttpServletRequest request) {
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    Set<UUID> teamIds = user.getTeamIds();
    if (teamIds != null && teamIds.contains(teamId)) {
      teamIds.remove(teamId);
      user.setTeamIds(teamIds);
      userRepository.save(user);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "User removed from team successfully",
          "User removed",
          request,
          LocalDateTime.now());
    }

    return ResponseUtil.buildErrorMessage(
        HttpStatus.BAD_REQUEST,
        "User is not part of the specified team",
        request,
        LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<Object>> addTaskToUser(
      UUID taskId, UUID userId, HttpServletRequest request) {
    // Fetch the user and handle the case where the user is not found
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));

    // Check if the user has taskIds and add the taskId
    if (user.getTaskIds() == null) {
      List<UUID> taskIds = new ArrayList<>();
      taskIds.add(taskId);
      user.setTaskIds(taskIds);
    } else {
      user.getTaskIds().add(taskId);
    }

    // Save the updated user and return success message
    userRepository.save(user);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Task assigned to the User",
        "Task assigned successfully",
        request,
        LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<List<User>>> getUsersByProjectId(
      UUID projectId, HttpServletRequest request) {
    // Fetch users by projectId and handle the case where no users are found
    List<User> users = userRepository.findByProjectIds(projectId);

    if (users.isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND,
          "No users found for the given project ID",
          request,
          LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Users retrieved successfully", users, request, LocalDateTime.now());
  }

  @Override
  public ResponseEntity<StandardResponse<User>> updateUserOrganizationId(
      UUID userId, UUID organizationId, HttpServletRequest request) {
    // Validate input parameters
    if (userId == null || organizationId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    try {
      // Find the user
      User user =
          userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

      // Update organization ID and save the user
      user.setOrganizationId(organizationId);
      user.setOnboarded(true);
      User updatedUser = userRepository.save(user);

      // Return success response
      return ResponseUtil.buildSuccessMessage(
          HttpStatus.OK,
          "Organization ID updated successfully",
          updatedUser,
          request,
          LocalDateTime.now());
    } catch (RuntimeException e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, e.getMessage(), request, LocalDateTime.now());
    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error updating organization ID",
          request,
          LocalDateTime.now());
    }
  }

  @Override
  public ResponseEntity<StandardResponse<Object>> assignProjectToUser(
      UUID projectId, UUID userId, HttpServletRequest request) {
    // Fetch the user and handle the case where the user is not found
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));

    // Check if the user has projectIds and assign the projectId
    if (user.getProjectIds() == null) {
      List<UUID> projectIds = new ArrayList<>();
      projectIds.add(projectId);
      user.setProjectIds(projectIds);
    } else {
      user.getProjectIds().add(projectId);
    }

    // Save the updated user and return success message
    userRepository.save(user);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Project assigned to the User",
        "Project assigned successfully",
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<List<UserResponse>>> getUsersByOrganizationId(
      UUID organizationId, HttpServletRequest request) {

    List<UserResponse> users = new ArrayList<>();

    List<User> organizationUsers = userRepository.findUsersByOrganizationId(organizationId);

    for (User user : organizationUsers) {
      users.add(
          new UserResponse(
              user.getUserId(),
              user.getUserName(),
              user.getName(),
              user.getEmail(),
              user.getLocation(),
              user.getRole().getRoleName().toString()));
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Users fetched based on Organization ID",
        users,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Object>> inviteUsersToOrganization(
      InviteUsersToOrganizationRequest inviteUsersToOrganizationRequest,
      HttpServletRequest request) {

    if (inviteUsersToOrganizationRequest.getOrganizationId() == null
        || inviteUsersToOrganizationRequest.getAddUsersToOrganization().isEmpty()) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    for (AddUserToOrganization user :
        inviteUsersToOrganizationRequest.getAddUsersToOrganization()) {

      Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
      User existingOrNewUser;
      AppRole appRole;

      switch (user.getRole()) {
        case "ADMIN":
          appRole = AppRole.ROLE_ADMIN;
          break;
        case "TEAM_LEADER":
          appRole = AppRole.ROLE_TEAM_LEAD;
          break;
        case "PROJECT_MANAGER":
          appRole = AppRole.ROLE_PROJECT_MANAGER;
          break;
        case "DEVELOPER":
          appRole = AppRole.ROLE_DEVELOPER;
          break;
        default:
          return ResponseUtil.buildErrorMessage(
              HttpStatus.BAD_REQUEST, "Invalid role", request, LocalDateTime.now());
      }

      Optional<Role> optionalRole = roleRepository.findByRoleName(appRole);
      if (optionalRole.isEmpty()) {
        return ResponseUtil.buildErrorMessage(
            HttpStatus.BAD_REQUEST, "Invalid role", request, LocalDateTime.now());
      }

      if (optionalUser.isPresent()) {
        existingOrNewUser = optionalUser.get();

        Optional<SetupAccountToken> optionalSetupAccountToken =
            setupAccountTokenRepository.findSetupAccountTokenByUser_UserId(
                existingOrNewUser.getUserId());

        optionalSetupAccountToken.ifPresent(setupAccountTokenRepository::delete);
        log.info("User {} already exists. Sending invite email.", existingOrNewUser.getEmail());
      } else {
        User newUser = new User();
        newUser.setSignUpMethod("EMAIL");
        newUser.setEmail(user.getEmail());
        newUser.setRole(optionalRole.get());
        newUser.setUserSetupByOrganization(true);
        newUser.setOrganizationId(inviteUsersToOrganizationRequest.getOrganizationId());
        newUser.setOnboarded(false); // Not onboarded yet

        existingOrNewUser = userRepository.save(newUser);
        log.info("New user created with email: {}", existingOrNewUser.getEmail());
      }

      Random random = new Random();
      int token = 100000 + random.nextInt(900000);

      setupAccountTokenRepository.save(
          new SetupAccountToken(existingOrNewUser, token, LocalDateTime.now().plusHours(1), false));

      String organizationName =
          organizationFeignClient
              .getOrganizationByOrganizationId(inviteUsersToOrganizationRequest.getOrganizationId())
              .getBody()
              .getData()
              .getOrganizationName();

      String subject = "Your Invite to Join " + organizationName;
      String emailBodyContent =
          String.format(
              "Hello,\n\n"
                  + "You have been invited to join "
                  + organizationName
                  + " on [Your Platform Name].\n\n"
                  + "Please use the following code to set up your account:\n\n"
                  + "Invite Code: %d\n\n"
                  + "To complete your registration, visit the platform and enter this code in the account setup process.\n\n"
                  + "If you have any questions, please contact support.\n\n"
                  + "Thank you,\n"
                  + "The SyncTeam",
              token);

      Destination destination =
          Destination.builder().toAddresses(existingOrNewUser.getEmail()).build();

      Content subjectContent = Content.builder().data(subject).build();
      Content bodyContent = Content.builder().data(emailBodyContent).build();
      Body emailBody = Body.builder().text(bodyContent).build();

      Message message = Message.builder().subject(subjectContent).body(emailBody).build();

      SendEmailRequest sendEmailRequest =
          SendEmailRequest.builder()
              .source(dotenv.get("AWS_SES_VERIFIED_EMAIL"))
              .destination(destination)
              .message(message)
              .build();

      sesClient.sendEmail(sendEmailRequest);
      log.info("Email sent successfully to {}", existingOrNewUser.getEmail());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Invite mail sent successfully", null, request, LocalDateTime.now());
  }
}
