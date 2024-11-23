export interface Team {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  members: string[];
  projects: string[];
}
