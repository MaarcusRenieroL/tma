import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AdminDashboardComponent } from "./pages/admin-pages/admin-dashboard/admin-dashboard.component";
import { AdminProjectsComponent } from "./pages/admin-pages/admin-projects/admin-projects.component";
import { AdminTeamsComponent } from "./pages/admin-pages/admin-teams/admin-teams.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "admin/projects", component: AdminProjectsComponent },
  { path: "admin/teams", component: AdminTeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
