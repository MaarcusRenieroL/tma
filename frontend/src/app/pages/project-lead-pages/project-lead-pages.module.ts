import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectLeadDashboardComponent } from './project-lead-dashboard/project-lead-dashboard.component';
import { ProjectLeadNavbarComponent } from './project-lead-navbar/project-lead-navbar.component';
import {
	ProjectLeadAccountNavComponent
} from './project-lead-navbar/project-lead-account-nav/project-lead-account-nav.component';
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { RouterLink } from "@angular/router";
import {
	HlmSheetModule
} from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { bootstrapGlobe } from "@ng-icons/bootstrap-icons";
import { heroUser, heroEllipsisHorizontal } from "@ng-icons/heroicons/outline";
import { HlmIconModule } from "@spartan-ng/ui-icon-helm";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { BrnAvatarModule } from "@spartan-ng/ui-avatar-brain";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { ProjectLeadDashboardOngoingTasksComponent } from './project-lead-dashboard/project-lead-dashboard-ongoing-tasks/project-lead-dashboard-ongoing-tasks.component';
import { ProjectLeadDashboardStatsComponent } from './project-lead-dashboard/project-lead-dashboard-stats/project-lead-dashboard-stats.component';
import { ProjectLeadDashboardTopPerformersComponent } from './project-lead-dashboard/project-lead-dashboard-top-performers/project-lead-dashboard-top-performers.component';
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { ProjectLeadActivityLogsComponent } from './project-lead-activity-logs/project-lead-activity-logs.component';
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { BrnTableModule } from "@spartan-ng/ui-table-brain";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { HlmCheckboxModule } from "@spartan-ng/ui-checkbox-helm";
import { FormsModule } from "@angular/forms";
import { lucideChevronDown } from "@ng-icons/lucide";


@NgModule({
	declarations: [
		ProjectLeadDashboardComponent,
		ProjectLeadNavbarComponent,
		ProjectLeadAccountNavComponent,
  ProjectLeadDashboardOngoingTasksComponent,
  ProjectLeadDashboardStatsComponent,
  ProjectLeadDashboardTopPerformersComponent,
  ProjectLeadActivityLogsComponent
	],
	imports: [
		CommonModule,
		NgIcon,
		RouterLink,
		HlmSheetModule,
		BrnSheetModule,
		HlmButtonDirective,
		NgIcon,
		NgIconsModule.withIcons({bootstrapGlobe, heroUser, heroEllipsisHorizontal, lucideChevronDown}),
		HlmIconModule,
		HlmAvatarModule,
		BrnAvatarModule,
		HlmMenuModule,
		BrnMenuModule,
		HlmCardModule,
		HlmTableModule,
		BrnTableModule,
		HlmInputModule,
		HlmCheckboxModule,
		FormsModule,
	], exports: [
		ProjectLeadDashboardComponent,
		ProjectLeadNavbarComponent,
	]
})
export class ProjectLeadPagesModule {
}
