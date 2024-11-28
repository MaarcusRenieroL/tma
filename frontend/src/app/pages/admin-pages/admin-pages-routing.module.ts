import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { AdminTeamsComponent } from "./admin-teams/admin-teams.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminTasksComponent } from "./admin-tasks/admin-tasks.component";
import { AdminNotificationsComponent } from "./admin-notifications/admin-notifications.component";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";
import { AdminActivityLogsComponent } from "./admin-activity-logs/admin-activity-logs.component";
import { AdminProjectComponent } from "./admin-project/admin-project.component";
import { AdminTeamComponent } from "./admin-team/admin-team.component";

const routes: Routes = [
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "admin/projects", component: AdminProjectsComponent },
  { path: "admin/project/:id", component: AdminProjectComponent },
  { path: "admin/teams", component: AdminTeamsComponent },
  { path: "admin/team/:id", component: AdminTeamComponent },
  { path: "admin/users", component: AdminUsersComponent },
  { path: "admin/tasks", component: AdminTasksComponent },
  { path: "admin/notifications", component: AdminNotificationsComponent },
  { path: "admin/settings", component: AdminSettingsComponent },
  { path: "admin/logs", component: AdminActivityLogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}
