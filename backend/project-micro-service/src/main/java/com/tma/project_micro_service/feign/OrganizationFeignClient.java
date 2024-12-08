package com.tma.project_micro_service.feign;

import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "organization-micro-service", path = "/api/organizations")
public interface OrganizationFeignClient {
  @PutMapping("/{organizationId}/projects/{projectId}")
  void assignProjectToOrganization(
      @PathVariable UUID organizationId,
      @PathVariable UUID projectId,
      @RequestHeader("Authorization") String bearerToken);
}
