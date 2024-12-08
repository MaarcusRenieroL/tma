import { Project } from '../../../models/project';

export interface CreateNewProject {
  project: Project;
  teamId: string;
  userId: string;
  organizationId: string;
}
