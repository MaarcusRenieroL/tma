import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLeadDashboardComponent } from "./team-lead-dashboard/team-lead-dashboard.component";
import { TeamLeadProjectsComponent } from "./team-lead-projects/team-lead-projects.component";

const routes: Routes = [
	{ path: "team-lead/dashboard", component: TeamLeadDashboardComponent },
	{ path: "team-lead/projects", component: TeamLeadProjectsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class TeamLeadRoutingModule { }
