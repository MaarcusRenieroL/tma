package com.tma.organization_micro_service.payload.request;

import com.tma.organization_micro_service.model.Organization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateOrganizationRequest {
  private Organization organization;
  private UUID userId;
}
