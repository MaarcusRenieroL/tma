export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: string;
  name: string;
  location?: string;
  teamIds?: string[];
  taskIds?: string[];
  projectIds?: string[];
}
