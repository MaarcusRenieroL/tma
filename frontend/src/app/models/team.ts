export interface Team {
	teamName: string;
	teamDescription: string;
	createdAt: Date;
	updatedAt: Date;
	userIds: string[];
	projectIds: string[];
	taskIds: string[];
}