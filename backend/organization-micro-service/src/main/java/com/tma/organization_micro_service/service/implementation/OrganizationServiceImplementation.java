package com.tma.organization_micro_service.service.implementation;

import com.tma.organization_micro_service.feign.UserFeignClient;
import com.tma.organization_micro_service.model.Organization;
import com.tma.organization_micro_service.payload.request.UpdateUserOrganizationRequest;
import com.tma.organization_micro_service.payload.response.StandardResponse;
import com.tma.organization_micro_service.repository.OrganizationRepository;
import com.tma.organization_micro_service.service.OrganizationService;
import com.tma.organization_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OrganizationServiceImplementation implements OrganizationService {

  private final OrganizationRepository organizationRepository;
  private final UserFeignClient userFeignClient;

  public OrganizationServiceImplementation(
      OrganizationRepository organizationRepository, UserFeignClient userFeignClient) {
    this.organizationRepository = organizationRepository;
    this.userFeignClient = userFeignClient;
  }

  public ResponseEntity<StandardResponse<Organization>> createOrganization(
      Organization organization, UUID userId, HttpServletRequest request) {
    // Check for Bearer token
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.UNAUTHORIZED,
          "Authorization token is missing or invalid",
          request,
          LocalDateTime.now());
    }

    // Input validation
    if (organization == null || userId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST,
          "Organization and userId cannot be null",
          request,
          LocalDateTime.now());
    }

    try {
      // Initialize userIds set if null and add the creator's userId
      if (organization.getUserIds() == null) {
        organization.setUserIds(new HashSet<>());
      }
      organization.getUserIds().add(userId);

      // Save the organization
      Organization savedOrganization = organizationRepository.save(organization);

      log.info("Organization ID: {}", savedOrganization.getOrganizationId());

      // Update user's organization ID through feign client
      userFeignClient.updateUserOrganizationId(
          userId,
          new UpdateUserOrganizationRequest(savedOrganization.getOrganizationId(), userId),
          bearerToken);

      return ResponseUtil.buildSuccessMessage(
          HttpStatus.CREATED,
          "Organization created successfully",
          savedOrganization,
          request,
          LocalDateTime.now());

    } catch (Exception e) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error creating organization: " + e.getMessage(),
          request,
          LocalDateTime.now());
    }
  }

  public ResponseEntity<StandardResponse<Organization>> getOrganizationById(
      UUID organizationId, HttpServletRequest request) {
    if (organizationId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    Organization organization = organizationRepository.findById(organizationId).orElse(null);

    if (organization == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Organization not found", request, LocalDateTime.now());
    }

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Organization fetched successfully",
        organization,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<List<Organization>>> getAllOrganizations(
      HttpServletRequest request) {
    List<Organization> organizations = organizationRepository.findAll();
    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Organizations fetched successfully",
        organizations,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Organization>> updateOrganization(
      Organization updatedOrganization, UUID organizationId, HttpServletRequest request) {
    if (updatedOrganization == null || organizationId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    Organization existingOrganization =
        organizationRepository.findById(organizationId).orElse(null);

    if (existingOrganization == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Organization not found", request, LocalDateTime.now());
    }

    existingOrganization.setOrganizationName(updatedOrganization.getOrganizationName());
    existingOrganization.setEmail(updatedOrganization.getEmail());
    existingOrganization.setWebsite(updatedOrganization.getWebsite());
    existingOrganization.setPhoneNumber(updatedOrganization.getPhoneNumber());
    existingOrganization.setAddress(updatedOrganization.getAddress());
    existingOrganization.setLogoUrl(updatedOrganization.getLogoUrl());
    existingOrganization.setUserIds(updatedOrganization.getUserIds());

    Organization savedOrganization = organizationRepository.save(existingOrganization);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK,
        "Organization updated successfully",
        savedOrganization,
        request,
        LocalDateTime.now());
  }

  public ResponseEntity<StandardResponse<Organization>> deleteOrganization(
      UUID organizationId, HttpServletRequest request) {
    if (organizationId == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
    }

    Organization existingOrganization =
        organizationRepository.findById(organizationId).orElse(null);

    if (existingOrganization == null) {
      return ResponseUtil.buildErrorMessage(
          HttpStatus.NOT_FOUND, "Organization not found", request, LocalDateTime.now());
    }

    organizationRepository.deleteById(organizationId);

    return ResponseUtil.buildSuccessMessage(
        HttpStatus.OK, "Organization deleted successfully", null, request, LocalDateTime.now());
  }
}
