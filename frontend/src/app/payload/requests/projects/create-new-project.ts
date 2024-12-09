export interface CreateNewProject {
  project: {
    projectTitle: string;
    projectDescription: string;
    deadline: Date;
  };
  teamId: string;
  userIds: string[];
  organizationId: string;
}
