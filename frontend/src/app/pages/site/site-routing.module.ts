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
import { AuthGuard } from "../../../auth.guard";

const routes: Routes = [
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: "projects", component: ProjectsComponent, canActivate: [AuthGuard] },
	{ path: "project/:id", component: ProjectComponent, canActivate: [AuthGuard] },
	{ path: "teams", component: TeamsComponent, canActivate: [AuthGuard] },
	{ path: "team/:id", component: TeamComponent, canActivate: [AuthGuard] },
	{ path: "tasks", component: TasksComponent, canActivate: [AuthGuard] },
	{ path: "users", component: UsersComponent, canActivate: [AuthGuard] },
	{ path: "notifications", component: NotificationsComponent, canActivate: [AuthGuard] },
	{ path: "logs", component: ActivityLogsComponent, canActivate: [AuthGuard] },
	{ path: "settings", component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class SiteRoutingModule {}
