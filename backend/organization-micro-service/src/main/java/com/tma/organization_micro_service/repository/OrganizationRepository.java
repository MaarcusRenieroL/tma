package com.tma.organization_micro_service.repository;

import com.tma.organization_micro_service.model.Organization;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {}
