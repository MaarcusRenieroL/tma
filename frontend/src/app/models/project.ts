export interface Project {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  status: string;
  priority: string;
  deadline: Date;
  userIds: string[];
}
