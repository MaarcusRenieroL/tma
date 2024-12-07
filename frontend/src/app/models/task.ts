export interface Task {
  taskId: string;
  title: string;
  description: string;
  status: Status;
  dateAllocated: string;
  dueDate: Date;
  priority: Priority;
  projectId: string;
  teamId: string;
  userIds: string[];
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
