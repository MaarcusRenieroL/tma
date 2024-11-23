import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";
import { DeveloperProjectsComponent } from "./developer-projects/developer-projects.component";

const routes: Routes = [
  { path: "developer/dashboard", component: DeveloperDashboardComponent },
  { path: "developer/projects", component: DeveloperProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DeveloperPagesRoutingModule {}
