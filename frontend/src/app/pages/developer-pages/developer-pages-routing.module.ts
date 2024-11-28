import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";
import { DeveloperProjectsComponent } from "./developer-projects/developer-projects.component";
import { DeveloperTeamsComponent } from "./developer-teams/developer-teams.component";
import { DeveloperTasksComponent } from "./developer-tasks/developer-tasks.component";
import { DeveloperNotificationsComponent } from "./developer-notifications/developer-notifications.component";
import { DeveloperSettingsComponent } from "./developer-settings/developer-settings.component";

const routes: Routes = [
  { path: "developer/dashboard", component: DeveloperDashboardComponent },
  { path: "developer/projects", component: DeveloperProjectsComponent },
  { path: "developer/teams", component: DeveloperTeamsComponent },
  { path: "developer/tasks", component: DeveloperTasksComponent },
  {
    path: "developer/notifications",
    component: DeveloperNotificationsComponent,
  },
  { path: "developer/settings", component: DeveloperSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DeveloperPagesRoutingModule {}
