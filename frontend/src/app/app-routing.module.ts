import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AdminDashboardComponent } from "./pages/admin-pages/admin-dashboard/admin-dashboard.component";
import { AdminProjectsComponent } from "./pages/admin-pages/admin-projects/admin-projects.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "admin/projects", component: AdminProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
