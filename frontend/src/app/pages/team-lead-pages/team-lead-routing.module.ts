import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLeadDashboardComponent } from "./team-lead-dashboard/team-lead-dashboard.component";

const routes: Routes = [
	{ path: "team-lead/dashboard", component: TeamLeadDashboardComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class TeamLeadRoutingModule { }
