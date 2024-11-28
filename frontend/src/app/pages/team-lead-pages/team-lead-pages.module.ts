import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { TeamLeadActivityLogsComponent } from './team-lead-activity-logs/team-lead-activity-logs.component';
import { lucideChevronDown } from "@ng-icons/lucide";
import { TeamLeadSettingsComponent } from './team-lead-settings/team-lead-settings.component';
import {
	TeamLeadSettingsTeamTabComponent
} from './team-lead-settings/team-lead-settings-team-tab/team-lead-settings-team-tab.component';
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
import { HlmLabelModule } from "@spartan-ng/ui-label-helm";
import {
	TeamLeadSettingsAppearanceTabComponent
} from "./team-lead-settings/team-lead-settings-appearance-tab/team-lead-settings-appearance-tab.component";
import {
	TeamLeadSettingsProfileTabComponent
} from "./team-lead-settings/team-lead-settings-profile-tab/team-lead-settings-profile-tab.component";
import {
	TeamLeadSettingsCompanyProfileTabComponent
} from "./team-lead-settings/team-lead-settings-company-profile-tab/team-lead-settings-company-profile-tab.component";
import {
	TeamLeadSettingsPasswordTabComponent
} from "./team-lead-settings/team-lead-settings-password-tab/team-lead-settings-password-tab.component";
import {
	TeamLeadSettingsNotificationsTabComponent
} from "./team-lead-settings/team-lead-settings-notifications-tab/team-lead-settings-notifications-tab.component";
import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";
import { HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { BrnSelectModule } from "@spartan-ng/ui-select-brain";


@NgModule({
	declarations: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
		TeamLeadProjectsComponent,
		TeamLeadUsersComponent,
		TeamLeadTasksComponent,
		TeamLeadNotificationsComponent,
		TeamLeadActivityLogsComponent,
		TeamLeadSettingsComponent,
		TeamLeadSettingsAppearanceTabComponent,
		TeamLeadSettingsProfileTabComponent,
		TeamLeadSettingsCompanyProfileTabComponent,
		TeamLeadSettingsPasswordTabComponent,
		TeamLeadSettingsNotificationsTabComponent,
		TeamLeadSettingsTeamTabComponent,
	],
	imports: [
		CommonModule, NgIconsModule.withIcons({
			bootstrapGlobe,
			heroEllipsisHorizontal,
			lucideChevronDown
		}), RouterModule, TeamLeadDashboardModule, HlmSheetModule, BrnSheetModule, HlmButtonDirective, HlmAvatarModule, HlmMenuModule, BrnMenuModule, TeamLeadProjectsModule, BrnTableModule, HlmTableModule, HlmCheckboxModule, FormsModule, HlmInputModule, HlmTabsModule, HlmCardModule, HlmToasterComponent, HlmLabelModule, NgOptimizedImage, HlmBadgeModule, HlmSelectModule, BrnSelectModule
	], exports: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
		TeamLeadDashboardModule
	],
})
export class TeamLeadPagesModule {
}
