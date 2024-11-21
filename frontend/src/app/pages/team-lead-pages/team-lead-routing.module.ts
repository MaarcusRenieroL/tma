import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLeadDashboardComponent } from "./team-lead-dashboard/team-lead-dashboard.component";
import { TeamLeadProjectsComponent } from "./team-lead-projects/team-lead-projects.component";
import { TeamLeadUsersComponent } from "./team-lead-users/team-lead-users.component";

const routes: Routes = [
	{ path: "team-lead/dashboard", component: TeamLeadDashboardComponent },
	{ path: "team-lead/projects", component: TeamLeadProjectsComponent },
	{ path: "team-lead/users", component: TeamLeadUsersComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class TeamLeadRoutingModule { }
