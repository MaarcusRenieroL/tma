import { Component } from "@angular/core";

@Component({
  selector: "developer-dashboard-daily-schedule",
  templateUrl: "./developer-dashboard-daily-schedule.component.html",
  styleUrl: "./developer-dashboard-daily-schedule.component.css",
})
export class DeveloperDashboardDailyScheduleComponent {
  users = [
    { name: "User 1", percentage: 85 },
    { name: "User 2", percentage: 90 },
    { name: "User 3", percentage: 75 },
    { name: "User 4", percentage: 88 },
    { name: "User 5", percentage: 92 },
  ];
}
