import { Component } from "@angular/core";
import { Team } from "../../../models/team";

@Component({
  selector: "developer-teams",
  templateUrl: "./developer-teams.component.html",
})
export class DeveloperTeamsComponent {
  teams: Team[] = [
    {
      name: "Engineering Team",
      description:
        "Responsible for developing and maintaining the company's software solutions.",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-11-01"),
      members: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
      projects: ["Project Phoenix", "System Revamp"],
    },
    {
      name: "Marketing Team",
      description:
        "Handles branding, advertising, and customer outreach campaigns.",
      createdAt: new Date("2022-09-01"),
      updatedAt: new Date("2023-10-21"),
      members: ["Diana Prince", "Eve Adams"],
      projects: ["Campaign Blitz", "New Product Launch"],
    },
    {
      name: "Product Management Team",
      description:
        "Manages the lifecycle of products and coordinates with cross-functional teams.",
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-11-10"),
      members: ["Frank Castle", "Grace Lee", "Henry Ford"],
      projects: ["Feature Rollout", "Market Expansion"],
    },
    {
      name: "Customer Support Team",
      description:
        "Provides support and solutions to customer inquiries and issues.",
      createdAt: new Date("2021-11-25"),
      updatedAt: new Date("2023-10-05"),
      members: ["Ivy Green", "Jack White"],
      projects: ["Helpdesk Optimization", "Customer Satisfaction Survey"],
    },
    {
      name: "Research and Development Team",
      description:
        "Focuses on innovation and the development of new technologies.",
      createdAt: new Date("2020-06-14"),
      updatedAt: new Date("2023-09-30"),
      members: ["Kelly Blue", "Luke Sky"],
      projects: ["AI Exploration", "Next-Gen Prototypes"],
    },
  ];
}
