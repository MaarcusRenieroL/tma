import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NgIconsModule } from "@ng-icons/core";
import { heroUser, heroEllipsisHorizontal } from "@ng-icons/heroicons/outline";
import {
  bootstrapEye,
  bootstrapPen,
  bootstrapTrash,
} from "@ng-icons/bootstrap-icons";
import {
  lucideUser,
  lucideChevronDown,
  lucideArrowUpDown,
  lucideUsers,
  lucideLayers,
  lucideCog,
  lucideKeyboard,
  lucideUserCircle,
  lucideSmile,
  lucidePlus,
  lucideGithub,
  lucideHelpCircle,
  lucideCode,
  lucideLogOut,
  lucideMail,
  lucideMessageSquare,
  lucidePlusCircle,
} from "@ng-icons/lucide";

import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { BrnSelectComponent } from "@spartan-ng/ui-select-brain";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";
import { BrnTableModule } from "@spartan-ng/ui-table-brain";

import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
import { HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import { HlmBadgeDirective } from "@spartan-ng/ui-badge-helm";
import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { HlmCheckboxComponent } from "@spartan-ng/ui-checkbox-helm";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";

import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminDashboardStatsComponent } from "./admin-dashboard/admin-dashboard-stats/admin-dashboard-stats.component";
import { AdminDashboardOngoingTasksComponent } from "./admin-dashboard/admin-dashboard-ongoing-tasks/admin-dashboard-ongoing-tasks.component";
import { AdminDashboardTopPerformersComponent } from "./admin-dashboard/admin-dashboard-top-performers/admin-dashboard-top-performers.component";

import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";
import { AdminSettingsPasswordTabComponent } from "./admin-settings/admin-settings-password-tab/admin-settings-password-tab.component";
import { AdminSettingsAppearanceTabComponent } from "./admin-settings/admin-settings-appearance-tab/admin-settings-appearance-tab.component";
import { AdminSettingsProfileTabComponent } from "./admin-settings/admin-settings-profile-tab/admin-settings-profile-tab.component";
import { AdminSettingsTeamTabComponent } from "./admin-settings/admin-settings-team-tab/admin-settings-team-tab.component";

import { AdminTeamsComponent } from "./admin-teams/admin-teams.component";
import { AdminTeamCardComponent } from "./admin-teams/admin-team-card/admin-team-card.component";
import { AdminTeamToolbarComponent } from "./admin-teams/admin-team-toolbar/admin-team-toolbar.component";
import { AdminTeamDepartmentComponent } from "./admin-teams/admin-team-toolbar/admin-team-department/admin-team-department.component";
import { AdminTeamSortByComponent } from "./admin-teams/admin-team-toolbar/admin-team-sort-by/admin-team-sort-by.component";

import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { AdminProjectToolbarComponent } from "./admin-projects/admin-project-toolbar/admin-project-toolbar.component";
import { AdminProjectCategoryComponent } from "./admin-projects/admin-project-toolbar/admin-project-category/admin-project-category.component";
import { AdminProjectStatusComponent } from "./admin-projects/admin-project-toolbar/admin-project-status/admin-project-status.component";
import { AdminProjectSortByComponent } from "./admin-projects/admin-project-toolbar/admin-project-sort-by/admin-project-sort-by.component";
import { AdminProjectCardComponent } from "./admin-projects/admin-project-card/admin-project-card.component";

import { AdminNotificationsComponent } from "./admin-notifications/admin-notifications.component";

import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { AdminSettingsNotificationsTabComponent } from "./admin-settings/admin-settings-notifications-tab/admin-settings-notifications-tab.component";
import { AdminSettingsCompanyProfileTabComponent } from "./admin-settings/admin-settings-company-profile-tab/admin-settings-company-profile-tab.component";
import { AdminActivityLogsComponent } from "./admin-activity-logs/admin-activity-logs.component";
import { AccountNavComponent } from "./admin-navbar/account-nav/account-nav.component";
import { Router, RouterModule } from "@angular/router";
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminTasksComponent } from './admin-tasks/admin-tasks.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminDashboardStatsComponent,
    AdminDashboardOngoingTasksComponent,
    AdminDashboardTopPerformersComponent,

    AdminNavbarComponent,

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
    AdminSettingsTeamTabComponent,
    AdminSettingsNotificationsTabComponent,
    AdminSettingsCompanyProfileTabComponent,
    AdminActivityLogsComponent,
    AccountNavComponent,
    AdminUsersComponent,
    AdminTasksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule
    ,

    NgIconsModule.withIcons({
      heroUser,
      bootstrapEye,
      bootstrapPen,
      bootstrapTrash,
      lucideChevronDown,
      lucideArrowUpDown,
      heroEllipsisHorizontal,
      lucideUsers,
      lucideLayers,
      lucideCog,
      lucideKeyboard,
      lucideUserCircle,
      lucideSmile,
      lucidePlus,
      lucideGithub,
      lucideHelpCircle,
      lucideCode,
      lucideLogOut,
      lucideMail,
      lucideMessageSquare,
      lucidePlusCircle,
      lucideUser
    }),

    BrnSheetModule,
    BrnMenuModule,
    BrnDialogModule,
    BrnSelectComponent,
    BrnTableModule,

    HlmSheetModule,
    HlmCardModule,
    HlmInputModule,
    HlmMenuModule,
    HlmDialogModule,
    HlmAvatarModule,
    HlmTabsModule,
    HlmSelectModule,
    HlmTableModule,

    HlmIconComponent,
    HlmBadgeDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmCheckboxComponent,
    HlmToasterComponent,
  ],
  exports: [AdminDashboardComponent, AdminNavbarComponent],
})
export class AdminPagesModule {}
