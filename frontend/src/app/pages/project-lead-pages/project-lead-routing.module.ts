import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLeadDashboardComponent } from "./project-lead-dashboard/project-lead-dashboard.component";

const routes: Routes = [
	{ path: "project-lead/dashboard", component: ProjectLeadDashboardComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class ProjectLeadRoutingModule { }
