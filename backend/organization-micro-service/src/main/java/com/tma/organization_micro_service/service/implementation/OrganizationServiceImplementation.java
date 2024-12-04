package com.tma.organization_micro_service.service.implementation;

import com.tma.organization_micro_service.model.Organization;
import com.tma.organization_micro_service.repository.OrganizationRepository;
import com.tma.organization_micro_service.service.OrganizationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrganizationServiceImplementation implements OrganizationService {
	
	private final OrganizationRepository organizationRepository;
	
	public OrganizationServiceImplementation(OrganizationRepository organizationRepository) {
		this.organizationRepository = organizationRepository;
	}
	
	public Organization createOrganization(Organization organization) {
		return organizationRepository.save(organization);
	}
	
	public Organization getOrganizationById(UUID organizationId) {
		return organizationRepository.findById(organizationId).orElse(null);
	}
	
	public List<Organization> getAllOrganizations() {
		return organizationRepository.findAll();
	}
	
	public Organization updateOrganization(Organization updatedOrganization, UUID organizationId) {
		Organization existingOrganization = organizationRepository.findById(organizationId)
			.orElseThrow(() -> new IllegalArgumentException("Organization not found"));
		
		existingOrganization.setOrganizationName(updatedOrganization.getOrganizationName());
		existingOrganization.setEmail(updatedOrganization.getEmail());
		existingOrganization.setWebsite(updatedOrganization.getWebsite());
		existingOrganization.setPhoneNumber(updatedOrganization.getPhoneNumber());
		existingOrganization.setAddress(updatedOrganization.getAddress());
		existingOrganization.setLogoUrl(updatedOrganization.getLogoUrl());
		existingOrganization.setUserIds(updatedOrganization.getUserIds());
		existingOrganization.setTeamIds(updatedOrganization.getTeamIds());
		existingOrganization.setProjectsIds(updatedOrganization.getProjectsIds());
		existingOrganization.setTasksIds(updatedOrganization.getTasksIds());
		return organizationRepository.save(existingOrganization);
	}
	
	public Organization deleteOrganization(UUID organizationId) {
		
		Optional<Organization> optionalOrganization = organizationRepository.findById(organizationId);
		
		if (optionalOrganization.isEmpty()) {
			throw new IllegalArgumentException("Organization not found");
		}
		organizationRepository.deleteById(organizationId);
		
		return optionalOrganization.get();
	}
}
