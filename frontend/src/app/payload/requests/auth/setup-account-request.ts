export interface SetupAccountRequest {
  userId: string;
  user: {
    username: string;
    name: string;
    location: string;
    password: string;
    confirmPassword: string;
  };
}
