package com.tma.user_micro_service.payload.request;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteUsersToOrganizationRequest {
  private List<AddUserToOrganization> addUsersToOrganization;

  private UUID organizationId;
}
