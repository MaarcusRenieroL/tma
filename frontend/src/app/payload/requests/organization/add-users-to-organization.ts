export interface AddUsersToOrganization {
  addUsersToOrganization: {
    email: string;
    role: string;
  }[];
  organizationId: string;
}
