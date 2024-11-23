import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";
import { DeveloperProjectsComponent } from "./developer-projects/developer-projects.component";
import { DeveloperTeamsComponent } from "./developer-teams/developer-teams.component";
import { DeveloperTasksComponent } from "./developer-tasks/developer-tasks.component";

const routes: Routes = [
  { path: "developer/dashboard", component: DeveloperDashboardComponent },
  { path: "developer/projects", component: DeveloperProjectsComponent },
  { path: "developer/teams", component: DeveloperTeamsComponent },
  { path: "developer/tasks", component: DeveloperTasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DeveloperPagesRoutingModule {}
