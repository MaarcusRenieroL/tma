package com.tma.user_micro_service.payload.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationResponse {
  private UUID organizationId;

  private String organizationName;

  private String email;

  private String website;

  private String phoneNumber;

  private String address;

  private String logoUrl;
}
