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
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { ProjectLeadProjectCardComponent } from './project-lead-projects/project-lead-project-card/project-lead-project-card.component';
import { ProjectLeadProjectCategoryComponent } from './project-lead-projects/project-lead-project-toolbar/project-lead-project-category/project-lead-project-category.component';
import { ProjectLeadProjectSortByComponent } from './project-lead-projects/project-lead-project-toolbar/project-lead-project-sort-by/project-lead-project-sort-by.component';
import { ProjectLeadProjectStatusComponent } from './project-lead-projects/project-lead-project-toolbar/project-lead-project-status/project-lead-project-status.component';
import { ProjectLeadProjectToolbarComponent } from './project-lead-projects/project-lead-project-toolbar/project-lead-project-toolbar.component';
import { ProjectLeadProjectsComponent } from './project-lead-projects/project-lead-projects.component';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { BrnTabsModule } from "@spartan-ng/ui-tabs-brain";
import { ProjectLeadNotificationsComponent } from './project-lead-notifications/project-lead-notifications.component';
import { ProjectLeadSettingsAppearanceTabComponent } from './project-lead-settings/project-lead-settings-appearance-tab/project-lead-settings-appearance-tab.component';
import { ProjectLeadSettingsCompanyProfileTabComponent } from './project-lead-settings/project-lead-settings-company-profile-tab/project-lead-settings-company-profile-tab.component';
import { ProjectLeadSettingsComponent } from './project-lead-settings/project-lead-settings.component';
import { ProjectLeadSettingsNotificationsTabComponent } from './project-lead-settings/project-lead-settings-notifications-tab/project-lead-settings-notifications-tab.component';
import { ProjectLeadSettingsPasswordTabComponent } from './project-lead-settings/project-lead-settings-password-tab/project-lead-settings-password-tab.component';
import { ProjectLeadSettingsProfileTabComponent } from './project-lead-settings/project-lead-settings-profile-tab/project-lead-settings-profile-tab.component';
import { ProjectLeadSettingsTeamTabComponent } from './project-lead-settings/project-lead-settings-team-tab/project-lead-settings-team-tab.component';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { ProjectLeadTasksComponent } from './project-lead-tasks/project-lead-tasks.component';
import { ProjectLeadUsersComponent } from './project-lead-users/project-lead-users.component';
import { ProjectLeadTeamCardComponent } from './project-lead-teams/project-lead-team-card/project-lead-team-card.component';
import { ProjectLeadTeamDepartmentComponent } from './project-lead-teams/project-lead-team-toolbar/project-lead-team-department/project-lead-team-department.component';
import { ProjectLeadTeamSortByComponent } from './project-lead-teams/project-lead-team-toolbar/project-lead-team-sort-by/project-lead-team-sort-by.component';
import { ProjectLeadTeamToolbarComponent } from './project-lead-teams/project-lead-team-toolbar/project-lead-team-toolbar.component';
import { ProjectLeadTeamsComponent } from './project-lead-teams/project-lead-teams.component';

@NgModule({
	declarations: [
		ProjectLeadDashboardComponent,
		ProjectLeadNavbarComponent,
		ProjectLeadAccountNavComponent,
		ProjectLeadDashboardOngoingTasksComponent,
		ProjectLeadDashboardStatsComponent,
		ProjectLeadDashboardTopPerformersComponent,
		ProjectLeadActivityLogsComponent,
		ProjectLeadProjectCardComponent,
		ProjectLeadProjectCategoryComponent,
		ProjectLeadProjectSortByComponent,
		ProjectLeadProjectStatusComponent,
		ProjectLeadProjectToolbarComponent,
		ProjectLeadProjectsComponent,
		ProjectLeadNotificationsComponent,
		ProjectLeadSettingsAppearanceTabComponent,
		ProjectLeadSettingsCompanyProfileTabComponent,
		ProjectLeadSettingsComponent,
		ProjectLeadSettingsNotificationsTabComponent,
		ProjectLeadSettingsPasswordTabComponent,
		ProjectLeadSettingsProfileTabComponent,
		ProjectLeadSettingsTeamTabComponent,
		ProjectLeadTasksComponent,
		ProjectLeadUsersComponent,
		ProjectLeadTeamCardComponent,
		ProjectLeadTeamDepartmentComponent,
		ProjectLeadTeamSortByComponent,
		ProjectLeadTeamToolbarComponent,
		ProjectLeadTeamsComponent,
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
		HlmTabsModule,
		BrnTabsModule,
		HlmDialogModule,
		BrnDialogModule,
		HlmSelectModule,
		BrnSelectModule,
		HlmToasterComponent
	], exports: [
		ProjectLeadDashboardComponent,
		ProjectLeadNavbarComponent,
		ProjectLeadProjectCardComponent,
		ProjectLeadProjectCategoryComponent,
		ProjectLeadProjectSortByComponent,
		ProjectLeadProjectStatusComponent,
		ProjectLeadProjectToolbarComponent,
		ProjectLeadProjectsComponent,
		ProjectLeadNotificationsComponent,
		ProjectLeadSettingsAppearanceTabComponent,
		ProjectLeadSettingsCompanyProfileTabComponent,
		ProjectLeadSettingsComponent,
		ProjectLeadSettingsNotificationsTabComponent,
		ProjectLeadSettingsPasswordTabComponent,
		ProjectLeadSettingsProfileTabComponent,
		ProjectLeadSettingsTeamTabComponent,
		ProjectLeadTasksComponent,
		ProjectLeadUsersComponent,
		ProjectLeadTeamCardComponent,
		ProjectLeadTeamDepartmentComponent,
		ProjectLeadTeamSortByComponent,
		ProjectLeadTeamToolbarComponent,
		ProjectLeadTeamsComponent,
	]
})
export class ProjectLeadPagesModule {
}
