export interface SignInResponse {
  userId: string;
  username: string;
  email: string;
  token: string;
  roles: string[];
  onboarded: boolean;
  verified: boolean;
}
