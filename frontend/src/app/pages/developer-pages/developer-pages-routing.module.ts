import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";
import { DeveloperProjectsComponent } from "./developer-projects/developer-projects.component";
import { DeveloperTeamsComponent } from "./developer-teams/developer-teams.component";

const routes: Routes = [
  { path: "developer/dashboard", component: DeveloperDashboardComponent },
  { path: "developer/projects", component: DeveloperProjectsComponent },
  { path: "developer/teams", component: DeveloperTeamsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DeveloperPagesRoutingModule {}
