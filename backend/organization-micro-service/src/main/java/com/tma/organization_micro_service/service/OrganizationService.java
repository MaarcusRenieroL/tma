package com.tma.organization_micro_service.service;

import com.tma.organization_micro_service.model.Organization;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrganizationService {
	
	Organization createOrganization(Organization organization);
	
	List<Organization> getAllOrganizations();
	
	Organization updateOrganization(Organization organization, UUID organizationId);
	
	Organization deleteOrganization(UUID organizationId);
	
	Organization getOrganizationById(UUID organizationId);
	
}
