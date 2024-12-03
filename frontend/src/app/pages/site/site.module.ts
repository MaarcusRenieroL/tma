import { NgModule } from '@angular/core';
import { ActivityLogsComponent } from "./activity-logs/activity-logs.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ProjectsComponent } from "./projects/projects.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TeamsComponent } from "./teams/teams.component";
import { UsersComponent } from "./users/users.component";
import { ProjectModule } from "./project/project.module";
import { TeamModule } from "./team/team.module";
import { SettingsModule } from "./settings/settings.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { FormsModule } from "@angular/forms";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { NgIconsModule } from "@ng-icons/core";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { BrnTableModule } from "@spartan-ng/ui-table-brain";
import { HlmCheckboxModule } from "@spartan-ng/ui-checkbox-helm";
import { CommonModule, DatePipe } from "@angular/common";
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { BrnTabsModule } from "@spartan-ng/ui-tabs-brain";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { SharedModule } from "../../../components/shared/shared.module";
import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";
import { RouterLink } from "@angular/router";
import { ModalsModule } from "../../../components/shared/modals/modals.module";
import { CardsModule } from "../../../components/shared/cards/cards.module";
import { lucideChevronDown } from "@ng-icons/lucide";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../../../auth.interceptor";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";

const components = [ ActivityLogsComponent, NotificationsComponent, ProjectsComponent, TasksComponent, TeamsComponent, UsersComponent ]

@NgModule({
	declarations: [ ...components ],
	imports: [
		ProjectModule,
		TeamModule,
		SettingsModule,
		DashboardModule,
		HlmButtonDirective,
		HlmInputModule, FormsModule, HlmMenuModule, BrnMenuModule, NgIconsModule.withIcons({
			lucideChevronDown
		}), HlmTableModule, BrnTableModule, HlmCheckboxModule, DatePipe, HlmTabsModule, BrnTabsModule, HlmCardModule, CommonModule, SharedModule, HlmDialogModule, BrnDialogModule, RouterLink, ModalsModule, CardsModule, HlmToasterComponent ],
	exports: [ ...components, ProjectModule, TeamModule, SettingsModule, DashboardModule ],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class SiteModule {
}
