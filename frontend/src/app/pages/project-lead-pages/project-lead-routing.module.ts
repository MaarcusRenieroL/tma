import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLeadDashboardComponent } from "./project-lead-dashboard/project-lead-dashboard.component";
import { ProjectLeadActivityLogsComponent } from "./project-lead-activity-logs/project-lead-activity-logs.component";
import { ProjectLeadNotificationsComponent } from "./project-lead-notifications/project-lead-notifications.component";
import { ProjectLeadProjectsComponent } from "./project-lead-projects/project-lead-projects.component";

const routes: Routes = [
	{ path: "project-lead/dashboard", component: ProjectLeadDashboardComponent },
	{ path: "project-lead/logs", component: ProjectLeadActivityLogsComponent },
	{ path: "project-lead/notifications", component: ProjectLeadNotificationsComponent },
	{ path: "project-lead/projects", component: ProjectLeadProjectsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class ProjectLeadRoutingModule { }
