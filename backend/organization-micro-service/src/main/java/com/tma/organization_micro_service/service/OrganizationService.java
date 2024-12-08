package com.tma.organization_micro_service.service;

import com.tma.organization_micro_service.model.Organization;
import com.tma.organization_micro_service.payload.response.StandardResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;

public interface OrganizationService {

  ResponseEntity<StandardResponse<Organization>> createOrganization(
      Organization organization, UUID userId, HttpServletRequest request);

  ResponseEntity<StandardResponse<List<Organization>>> getAllOrganizations(
      HttpServletRequest request);

  ResponseEntity<StandardResponse<Organization>> updateOrganization(
      Organization organization, UUID organizationId, HttpServletRequest request);

  ResponseEntity<StandardResponse<Organization>> deleteOrganization(
      UUID organizationId, HttpServletRequest request);

  ResponseEntity<StandardResponse<Organization>> getOrganizationById(
      UUID organizationId, HttpServletRequest request);

  ResponseEntity<StandardResponse<Organization>> assignProjectToOrganization(
      UUID organizationId, UUID projectId, HttpServletRequest request);
}
