import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";

const routes: Routes = [
  { path: "developer/dashboard", component: DeveloperDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DeveloperPagesRoutingModule {}
