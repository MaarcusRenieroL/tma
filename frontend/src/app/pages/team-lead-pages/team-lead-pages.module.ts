import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLeadNavbarComponent } from './team-lead-navbar/team-lead-navbar.component';
import { TeamLeadDashboardComponent } from './team-lead-dashboard/team-lead-dashboard.component';
import { TeamLeadAccountNavComponent } from './team-lead-navbar/team-lead-account-nav/team-lead-account-nav.component';
import { NgIconsModule } from "@ng-icons/core";
import { bootstrapGlobe } from "@ng-icons/bootstrap-icons";
import { RouterModule } from "@angular/router";
import { TeamLeadDashboardModule } from "./team-lead-dashboard/team-lead-dashboard.module";
import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { TeamLeadProjectsComponent } from './team-lead-projects/team-lead-projects.component';
import { TeamLeadProjectsModule } from "./team-lead-projects/team-lead-projects.module";
import { TeamLeadUsersComponent } from './team-lead-users/team-lead-users.component';
import { BrnTableModule } from "@spartan-ng/ui-table-brain";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { HlmCheckboxModule } from "@spartan-ng/ui-checkbox-helm";
import { FormsModule } from "@angular/forms";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { TeamLeadTasksComponent } from "./team-lead-tasks/team-lead-tasks.component";
import { heroEllipsisHorizontal } from "@ng-icons/heroicons/outline";
import { TeamLeadNotificationsComponent } from './team-lead-notifications/team-lead-notifications.component';
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";


@NgModule({
	declarations: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
  TeamLeadProjectsComponent,
  TeamLeadUsersComponent,
  TeamLeadTasksComponent,
  TeamLeadNotificationsComponent,
	],
	imports: [
		CommonModule, NgIconsModule.withIcons({bootstrapGlobe, heroEllipsisHorizontal}), RouterModule, TeamLeadDashboardModule, HlmSheetModule, BrnSheetModule, HlmButtonDirective, HlmAvatarModule, HlmMenuModule, BrnMenuModule, TeamLeadProjectsModule, BrnTableModule, HlmTableModule, HlmCheckboxModule, FormsModule, HlmInputModule, HlmTabsModule, HlmCardModule
	], exports: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
		TeamLeadDashboardModule
	],
})
export class TeamLeadPagesModule {
}
