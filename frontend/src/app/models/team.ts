export interface Team {
	teamId: string;
	teamName: string;
	teamDescription: string;
	createdAt: Date;
	updatedAt: Date;
	userIds: string[];
	projectIds: string[];
	taskIds: string[];
}