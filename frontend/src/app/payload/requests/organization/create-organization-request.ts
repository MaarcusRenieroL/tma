import { Organization } from "../../../models/organization";

export interface CreateOrganizationRequest {
	organization: Organization;
	userId: string;
}