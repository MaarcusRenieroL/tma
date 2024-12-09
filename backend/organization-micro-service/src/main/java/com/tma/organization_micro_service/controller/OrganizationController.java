package com.tma.organization_micro_service.controller;

import com.tma.organization_micro_service.model.Organization;
import com.tma.organization_micro_service.payload.request.CreateOrganizationRequest;
import com.tma.organization_micro_service.payload.response.StandardResponse;
import com.tma.organization_micro_service.service.OrganizationService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

  private final OrganizationService organizationService;

  public OrganizationController(OrganizationService organizationService) {
    this.organizationService = organizationService;
  }

  @GetMapping
  public ResponseEntity<StandardResponse<List<Organization>>> getAllOrganizations(
      HttpServletRequest request) {
    return organizationService.getAllOrganizations(request);
  }

  @GetMapping("/{organizationId}")
  public ResponseEntity<StandardResponse<Organization>> getOrganizationById(
      @PathVariable UUID organizationId, HttpServletRequest request) {
    return organizationService.getOrganizationById(organizationId, request);
  }

  @PostMapping
  public ResponseEntity<StandardResponse<Organization>> createOrganization(
      @RequestBody CreateOrganizationRequest createOrganizationRequest,
      HttpServletRequest request) {
    return organizationService.createOrganization(
        createOrganizationRequest.getOrganization(),
        createOrganizationRequest.getUserId(),
        request);
  }

  @PutMapping("/{organizationId}")
  public ResponseEntity<StandardResponse<Organization>> updateOrganization(
      @RequestBody Organization organization,
      @PathVariable UUID organizationId,
      HttpServletRequest request) {
    return organizationService.updateOrganization(organization, organizationId, request);
  }

  @DeleteMapping("/{organizationId}")
  public ResponseEntity<StandardResponse<Organization>> deleteOrganization(
      @PathVariable UUID organizationId, HttpServletRequest request) {
    return organizationService.deleteOrganization(organizationId, request);
  }

  @PutMapping("/{organizationId}/projects/{projectId}")
  ResponseEntity<StandardResponse<Organization>> assignProjectToOrganization(
      @PathVariable UUID organizationId, @PathVariable UUID projectId, HttpServletRequest request) {
    return organizationService.assignProjectToOrganization(organizationId, projectId, request);
  }

  @PutMapping("/{organizationId}/users/{userId}")
  ResponseEntity<StandardResponse<Organization>> assignUserToOrganization(
      @PathVariable UUID organizationId, @PathVariable UUID userId, HttpServletRequest request) {
    return organizationService.assignUserToOrganization(organizationId, userId, request);
  }
}
