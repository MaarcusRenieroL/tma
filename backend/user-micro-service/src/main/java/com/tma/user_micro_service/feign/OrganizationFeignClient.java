package com.tma.user_micro_service.feign;

import com.tma.user_micro_service.payload.response.OrganizationResponse;
import com.tma.user_micro_service.payload.response.StandardResponse;
import java.util.UUID;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "organization-micro-service", path = "/api/organizations")
public interface OrganizationFeignClient {

  @GetMapping("/{organizationId}")
  ResponseEntity<StandardResponse<OrganizationResponse>> getOrganizationByOrganizationId(
      @PathVariable("organizationId") UUID organizationId);

  @PutMapping("/{organizationId}/users/{userId}")
  ResponseEntity<StandardResponse<Object>> updateOrganizationUserList(
      @PathVariable UUID organizationId, @PathVariable UUID userId);
}
