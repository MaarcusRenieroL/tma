export interface Organization {
	organizationId: string;
	name: string;
	email: string;
	address: string;
	websiteUrl: string;
	logoUrl: string;
	userIds?: string[];
	teamIds?: string[];
	projectIds?: string[];
	taskIds?: string[];
}