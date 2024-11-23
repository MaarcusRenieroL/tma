export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  dateAllocated: Date;
  priority: string;
  status: string;
}
