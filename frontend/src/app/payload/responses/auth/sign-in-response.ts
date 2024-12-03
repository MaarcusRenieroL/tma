export interface SignInResponse {
	userId: string;
	username: string;
	token: string;
	roles: string[];
}