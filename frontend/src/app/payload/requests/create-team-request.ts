export interface CreateTeamRequest {
	team: {
		teamName: string;
		teamDescription: string;
	};
	userId: string;
}