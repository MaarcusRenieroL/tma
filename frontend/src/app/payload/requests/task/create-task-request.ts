export interface CreateTaskRequest {
  task: {
    title: string;
    description: string;
    dueDate: Date;
    dateAllocated: Date;
    priority: string;
    status: string;
    organizationId: string;
    teamId: string;
    projectId: string;
    userIds: string;
  };
  userIds: string[];
}
