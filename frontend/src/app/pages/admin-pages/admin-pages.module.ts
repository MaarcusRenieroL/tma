import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { NgIconsModule } from "@ng-icons/core";
import { heroUser } from "@ng-icons/heroicons/outline";
import {
  bootstrapEye,
  bootstrapPen,
  bootstrapTrash,
} from "@ng-icons/bootstrap-icons";
import { AdminDashboardStatsComponent } from "./admin-dashboard/admin-dashboard-stats/admin-dashboard-stats.component";
import { AdminDashboardOngoingTasksComponent } from "./admin-dashboard/admin-dashboard-ongoing-tasks/admin-dashboard-ongoing-tasks.component";
import { AdminDashboardTopPerformersComponent } from "./admin-dashboard/admin-dashboard-top-performers/admin-dashboard-top-performers.component";
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from "@spartan-ng/ui-sheet-brain";
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetHeaderComponent,
} from "@spartan-ng/ui-sheet-helm";
import {
	HlmCardContentDirective,
	HlmCardDescriptionDirective,
	HlmCardDirective, HlmCardFooterDirective,
	HlmCardHeaderDirective,
	HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { AdminProjectToolbarComponent } from './admin-projects/admin-project-toolbar/admin-project-toolbar.component';
import { BrnMenuTriggerDirective } from "@spartan-ng/ui-menu-brain";
import {
    HlmMenuComponent,
    HlmMenuGroupComponent, HlmMenuItemDirective, HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent, HlmMenuShortcutComponent, HlmSubMenuComponent
} from "@spartan-ng/ui-menu-helm";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import { AdminProjectCategoryComponent } from './admin-projects/admin-project-toolbar/admin-project-category/admin-project-category.component';
import { AdminProjectStatusComponent } from './admin-projects/admin-project-toolbar/admin-project-status/admin-project-status.component';
import { AdminProjectSortByComponent } from './admin-projects/admin-project-toolbar/admin-project-sort-by/admin-project-sort-by.component';
import { AdminProjectCardComponent } from './admin-projects/admin-project-card/admin-project-card.component';
import { HlmBadgeDirective } from "@spartan-ng/ui-badge-helm";
import {
	HlmDialogComponent,
	HlmDialogContentComponent,
	HlmDialogFooterComponent,
	HlmDialogHeaderComponent
} from "@spartan-ng/ui-dialog-helm";
import {
	BrnDialogContentDirective,
	BrnDialogDescriptionDirective,
	BrnDialogTitleDirective,
	BrnDialogTriggerDirective
} from "@spartan-ng/ui-dialog-brain";
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { AdminTeamCardComponent } from './admin-teams/admin-team-card/admin-team-card.component';
import { AdminTeamToolbarComponent } from './admin-teams/admin-team-toolbar/admin-team-toolbar.component';
import { AdminTeamDepartmentComponent } from './admin-teams/admin-team-toolbar/admin-team-department/admin-team-department.component';
import { AdminTeamSortByComponent } from './admin-teams/admin-team-toolbar/admin-team-sort-by/admin-team-sort-by.component';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from "@spartan-ng/ui-avatar-helm";
import { AdminNotificationsComponent } from './admin-notifications/admin-notifications.component';
import {
	HlmTabsComponent,
	HlmTabsContentDirective,
	HlmTabsListComponent,
	HlmTabsTriggerDirective
} from "@spartan-ng/ui-tabs-helm";
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminSettingsProfileTabComponent } from './admin-settings/admin-settings-profile-tab/admin-settings-profile-tab.component';
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
import { BrnSelectComponent } from "@spartan-ng/ui-select-brain";
import {
	HlmSelectContentDirective,
	HlmSelectOptionComponent,
	HlmSelectValueDirective,
	HlmSelectTriggerComponent
} from "@spartan-ng/ui-select-helm";
import { FormsModule } from "@angular/forms";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { AdminSettingsPasswordTabComponent } from './admin-settings/admin-settings-password-tab/admin-settings-password-tab.component';
import { AdminSettingsAppearanceTabComponent } from './admin-settings/admin-settings-appearance-tab/admin-settings-appearance-tab.component';
import { HlmCheckboxComponent } from "@spartan-ng/ui-checkbox-helm";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminNavbarComponent,
    AdminDashboardStatsComponent,
    AdminDashboardOngoingTasksComponent,
    AdminDashboardTopPerformersComponent,
    AdminProjectsComponent,
    AdminProjectToolbarComponent,
    AdminProjectCategoryComponent,
    AdminProjectStatusComponent,
    AdminProjectSortByComponent,
    AdminProjectCardComponent,
    AdminTeamsComponent,
    AdminTeamCardComponent,
    AdminTeamToolbarComponent,
    AdminTeamDepartmentComponent,
    AdminTeamSortByComponent,
    AdminNotificationsComponent,
    AdminSettingsComponent,
    AdminSettingsProfileTabComponent,
    AdminSettingsPasswordTabComponent,
    AdminSettingsAppearanceTabComponent,
  ],
	imports: [
		CommonModule,
		NgIconsModule.withIcons({
			heroUser,
			bootstrapEye,
			bootstrapPen,
			bootstrapTrash,
		}),
		BrnSheetContentDirective,
		BrnSheetTriggerDirective,
		HlmSheetComponent,
		HlmSheetContentComponent,
		HlmSheetHeaderComponent,
		HlmCardDirective,
		HlmCardHeaderDirective,
		HlmCardContentDirective,
		HlmCardTitleDirective,
		HlmCardDescriptionDirective,
		HlmInputDirective,
		BrnMenuTriggerDirective,
		HlmMenuComponent,
		HlmMenuLabelComponent,
		HlmMenuSeparatorComponent,
		HlmMenuGroupComponent,
		HlmMenuItemDirective,
		HlmMenuShortcutComponent,
		HlmMenuItemSubIndicatorComponent,
		HlmSubMenuComponent,
		HlmIconComponent,
		HlmCardFooterDirective,
		HlmBadgeDirective,
		HlmDialogComponent,
		BrnDialogTriggerDirective,
		HlmDialogContentComponent,
		HlmDialogHeaderComponent,
		BrnDialogTitleDirective,
		BrnDialogDescriptionDirective,
		HlmDialogFooterComponent,
		BrnDialogContentDirective,
		HlmAvatarComponent,
		HlmAvatarImageDirective,
		HlmAvatarFallbackDirective,
		HlmTabsComponent,
		HlmTabsListComponent,
		HlmTabsTriggerDirective,
		HlmTabsContentDirective,
		HlmLabelDirective,
		NgOptimizedImage,
		HlmToasterComponent,
		BrnSelectComponent,
		HlmSelectValueDirective,
		HlmSelectContentDirective,
		HlmSelectOptionComponent,
		HlmSelectTriggerComponent,
		FormsModule,
		HlmButtonDirective,
		HlmCheckboxComponent,
	],
  exports: [AdminDashboardComponent, AdminNavbarComponent],
})
export class AdminPagesModule {}
