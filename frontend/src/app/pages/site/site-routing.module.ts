import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectComponent } from "./project/project.component";
import { TeamsComponent } from "./teams/teams.component";
import { TeamComponent } from "./team/team.component";
import { TasksComponent } from "./tasks/tasks.component";
import { UsersComponent } from "./users/users.component";
import { ActivityLogsComponent } from "./activity-logs/activity-logs.component";
import { SettingsComponent } from "./settings/settings.component";
import { NotificationsComponent } from "./notifications/notifications.component";

const routes: Routes = [
	{ path: "dashboard", component: DashboardComponent },
	{ path: "projects", component: ProjectsComponent },
	{ path: "project/:id", component: ProjectComponent },
	{ path: "teams", component: TeamsComponent },
	{ path: "team/:id", component: TeamComponent },
	{ path: "tasks", component: TasksComponent },
	{ path: "users", component: UsersComponent },
	{ path: "notifications", component: NotificationsComponent },
	{ path: "logs", component: ActivityLogsComponent },
	{ path: "settings", component: SettingsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class SiteRoutingModule {}
