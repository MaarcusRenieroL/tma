package com.tma.organization_micro_service.controller;


import com.tma.organization_micro_service.model.Organization;
import com.tma.organization_micro_service.payload.response.StandardResponse;
import com.tma.organization_micro_service.service.OrganizationService;
import com.tma.organization_micro_service.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {
	
	private final OrganizationService organizationService;
	
	public OrganizationController(OrganizationService organizationService) {
		this.organizationService = organizationService;
	}
	
	@PostMapping
	public ResponseEntity<StandardResponse<Organization>> createOrganization(
		@RequestBody Organization organization, HttpServletRequest request) {
		if (organization.getOrganizationName().isEmpty() || organization.getAddress().isEmpty() || organization.getEmail().isEmpty() || organization.getPhoneNumber().isEmpty() || organization.getWebsite().isEmpty()) {
			return ResponseUtil.buildErrorMessage(HttpStatus.BAD_REQUEST, "Missing Required Fields", request, LocalDateTime.now());
		}
		
		return ResponseUtil.buildSuccessMessage(HttpStatus.CREATED, "Organization created successfully", organizationService.createOrganization(organization), request, LocalDateTime.now());
	}
	
	@GetMapping("/{organizationId}")
	public ResponseEntity<?> getOrganizationById(
		@PathVariable UUID organizationId, HttpServletRequest request) {
		if (organizationId == null) {
			return ResponseUtil.buildErrorMessage(HttpStatus.BAD_REQUEST, "Missing required fields", request, LocalDateTime.now());
		}
		
		return ResponseUtil.buildSuccessMessage(HttpStatus.OK, "Organization fetched successfully", organizationService.getOrganizationById(organizationId), request, LocalDateTime.now());
	}
	
	@GetMapping
	public ResponseEntity<?> getAllOrganizations(HttpServletRequest request) {
		return ResponseUtil.buildSuccessMessage(HttpStatus.OK, "Organization fetched successfully", organizationService.getAllOrganizations(), request, LocalDateTime.now());
	}
	
	@PutMapping("/{organizationId}")
	public ResponseEntity<?> updateOrganization(
		@PathVariable UUID organizationId,
		@RequestBody Organization updatedOrganization,
		HttpServletRequest request) {
		if (organizationId == null || updatedOrganization.getOrganizationName().isEmpty() || updatedOrganization.getAddress().isEmpty() || updatedOrganization.getEmail().isEmpty() || updatedOrganization.getPhoneNumber().isEmpty() || updatedOrganization.getWebsite().isEmpty()) {
			return ResponseUtil.buildErrorMessage(HttpStatus.BAD_REQUEST, "Missing Required Fields", request, LocalDateTime.now());
		}
		
		return ResponseUtil.buildSuccessMessage(HttpStatus.CREATED, "Organization created successfully", organizationService.updateOrganization(updatedOrganization, organizationId), request, LocalDateTime.now());
	}
	
	@DeleteMapping("/{organizationId}")
	public ResponseEntity<?> deleteOrganization(
		@PathVariable UUID organizationId, HttpServletRequest request) {
		try {
			if (organizationService.getOrganizationById(organizationId) == null) {
				return ResponseUtil.buildErrorMessage(
					HttpStatus.NOT_FOUND, "Project not found with ID: " + organizationId, request, LocalDateTime.now());
			}
			
			organizationService.deleteOrganization(organizationId);
			
			return ResponseUtil.buildSuccessMessage(
				HttpStatus.NO_CONTENT,
				"Organization deleted successfully",
				null,
				request,
				LocalDateTime.now());
			
		} catch (Exception e) {
			return ResponseUtil.buildErrorMessage(
				HttpStatus.INTERNAL_SERVER_ERROR,
				"An error occurred while deleting the project",
				request,
				LocalDateTime.now());
		}
	}
}
