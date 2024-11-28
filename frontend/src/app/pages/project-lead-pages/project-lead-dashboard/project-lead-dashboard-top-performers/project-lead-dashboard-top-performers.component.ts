import { Component } from '@angular/core';

@Component({
  selector: 'project-lead-dashboard-top-performers',
  templateUrl: './project-lead-dashboard-top-performers.component.html',
  styleUrl: './project-lead-dashboard-top-performers.component.css'
})
export class ProjectLeadDashboardTopPerformersComponent {
  users = [
    { name: "User 1", percentage: 85 },
    { name: "User 2", percentage: 90 },
    { name: "User 3", percentage: 75 },
    { name: "User 4", percentage: 88 },
    { name: "User 5", percentage: 92 },
  ];
}
