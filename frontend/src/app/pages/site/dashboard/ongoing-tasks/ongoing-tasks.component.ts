import { Component } from "@angular/core";

@Component({
  selector: "ongoing-tasks",
  templateUrl: "./ongoing-tasks.component.html",
})
export class OngoingTasksComponent {
  tasks = [
    {
      title: "Task 1",
      description: "This is a sample task",
      priority: "High",
      status: "In Progress",
      dueDate: new Date("2022-01-31"),
    },
    {
      title: "Task 2",
      description: "Prepare monthly financial report",
      priority: "Medium",
      status: "In Progress",
      dueDate: new Date("2024-11-30"),
    },
    {
      title: "Task 3",
      description: "Update project documentation",
      priority: "Low",
      status: "In Progress",
      dueDate: new Date("2024-12-10"),
    },
    {
      title: "Task 4",
      description: "Fix bug in user authentication module",
      priority: "High",
      status: "In Progress",
      dueDate: new Date("2024-11-20"),
    },
    {
      title: "Task 5",
      description: "Conduct team performance review",
      priority: "Medium",
      status: "In Progress",
      dueDate: new Date("2024-11-25"),
    },
    {
      title: "Task 6",
      description: "Research new marketing strategies for Q1",
      priority: "Low",
      status: "In Progress",
      dueDate: new Date("2024-12-05"),
    },
    {
      title: "Task 7",
      description: "Set up new employee onboarding program",
      priority: "High",
      status: "In Progress",
      dueDate: new Date("2024-11-18"),
    },
    {
      title: "Task 8",
      description: "Develop new feature for mobile app",
      priority: "Medium",
      status: "In Progress",
      dueDate: new Date("2024-11-22"),
    },
    {
      title: "Task 9",
      description: "Complete client presentation for next meeting",
      priority: "High",
      status: "In Progress",
      dueDate: new Date("2024-11-19"),
    },
    {
      title: "Task 10",
      description: "Review and approve marketing content",
      priority: "Medium",
      status: "In Progress",
      dueDate: new Date("2024-12-01"),
    },
  ];
}
