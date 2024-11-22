import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLeadDashboardComponent } from "./project-lead-dashboard/project-lead-dashboard.component";
import { ProjectLeadActivityLogsComponent } from "./project-lead-activity-logs/project-lead-activity-logs.component";

const routes: Routes = [
	{ path: "project-lead/dashboard", component: ProjectLeadDashboardComponent },
	{ path: "project-lead/logs", component: ProjectLeadActivityLogsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class ProjectLeadRoutingModule { }
