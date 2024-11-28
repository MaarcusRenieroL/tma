import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NgIconsModule } from "@ng-icons/core";
import { heroUser, heroEllipsisHorizontal } from "@ng-icons/heroicons/outline";
import {
  bootstrapEye,
  bootstrapPen,
  bootstrapTrash,
  bootstrapPlus
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
  lucidePlusCircle, lucideArrowRight,
  lucideDownload
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

import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { AdminProjectCardComponent } from "./admin-projects/admin-project-card/admin-project-card.component";

import { AdminNotificationsComponent } from "./admin-notifications/admin-notifications.component";

import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { AdminSettingsNotificationsTabComponent } from "./admin-settings/admin-settings-notifications-tab/admin-settings-notifications-tab.component";
import { AdminSettingsCompanyProfileTabComponent } from "./admin-settings/admin-settings-company-profile-tab/admin-settings-company-profile-tab.component";
import { AdminActivityLogsComponent } from "./admin-activity-logs/admin-activity-logs.component";
import { AccountNavComponent } from "./admin-navbar/account-nav/account-nav.component";
import { RouterModule } from "@angular/router";
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminTasksComponent } from './admin-tasks/admin-tasks.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminProjectOverviewTabComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-tab.component';
import { AdminProjectBoardTabComponent } from './admin-project/admin-project-board-tab/admin-project-board-tab.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AdminProjectOverviewStatsComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-stats/admin-project-overview-stats.component';
import { AdminProjectOverviewAssigneeGraphComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-assignee-graph/admin-project-overview-assignee-graph.component';
import { AdminProjectOverviewWorkloadGraphComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-workload-graph/admin-project-overview-workload-graph.component';
import { AdminProjectOverviewCompletedTasksComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-completed-tasks/admin-project-overview-completed-tasks.component';
import { AdminProjectOverviewRecentActivitiesComponent } from './admin-project/admin-project-overview-tab/admin-project-overview-recent-activities/admin-project-overview-recent-activities.component';
import { AdminProjectBoardTabTaskCardComponent } from './admin-project/admin-project-board-tab/admin-project-board-tab-task-card/admin-project-board-tab-task-card.component';
import { ionAttachOutline } from "@ng-icons/ionicons";
import { AdminProjectFilesTabComponent } from './admin-project/admin-project-files-tab/admin-project-files-tab.component';
import { AdminProjectFilesFileCardComponent } from './admin-project/admin-project-files-tab/admin-project-files-file-card/admin-project-files-file-card.component';
import { AdminProjectFilesToolbarComponent } from './admin-project/admin-project-files-tab/admin-project-files-toolbar/admin-project-files-toolbar.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AdminProjectsAddProjectModalComponent } from './admin-projects/admin-projects-add-project-modal/admin-projects-add-project-modal.component';
import { AdminProjectsDeleteProjectModalComponent } from './admin-projects/admin-projects-delete-project-modal/admin-projects-delete-project-modal.component';
import { HlmAlertDialogModule } from "@spartan-ng/ui-alertdialog-helm";
import { BrnAlertDialogModule } from "@spartan-ng/ui-alertdialog-brain";
import { AdminTeamsDeleteTeamModalComponent } from './admin-teams/admin-teams-delete-team-modal/admin-teams-delete-team-modal.component';
import { AdminTeamsAddTeamModalComponent } from './admin-teams/admin-teams-add-team-modal/admin-teams-add-team-modal.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminTeamOverviewTabComponent } from './admin-team/admin-team-overview-tab/admin-team-overview-tab.component';
import { AdminTeamProjectsTabComponent } from './admin-team/admin-team-projects-tab/admin-team-projects-tab.component';
import { AdminTeamBoardTabComponent } from './admin-team/admin-team-board-tab/admin-team-board-tab.component';
import { AdminTeamFilesTabComponent } from './admin-team/admin-team-files-tab/admin-team-files-tab.component';
import { AdminTeamCalendarTabComponent } from './admin-team/admin-team-calendar-tab/admin-team-calendar-tab.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminDashboardStatsComponent,
    AdminDashboardOngoingTasksComponent,
    AdminDashboardTopPerformersComponent,

    AdminNavbarComponent,

    AdminProjectsComponent,
    AdminProjectCardComponent,

    AdminTeamsComponent,
    AdminTeamCardComponent,

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
    AdminProjectComponent,
    AdminProjectOverviewTabComponent,
    AdminProjectBoardTabComponent,
    AdminProjectOverviewStatsComponent,
    AdminProjectOverviewAssigneeGraphComponent,
    AdminProjectOverviewWorkloadGraphComponent,
    AdminProjectOverviewCompletedTasksComponent,
    AdminProjectOverviewRecentActivitiesComponent,
    AdminProjectBoardTabTaskCardComponent,
    AdminProjectFilesTabComponent,
    AdminProjectFilesFileCardComponent,
    AdminProjectFilesToolbarComponent,
    AdminProjectsAddProjectModalComponent,
    AdminProjectsDeleteProjectModalComponent,
    AdminTeamsDeleteTeamModalComponent,
    AdminTeamsAddTeamModalComponent,
    AdminTeamComponent,
    AdminTeamOverviewTabComponent,
    AdminTeamProjectsTabComponent,
    AdminTeamBoardTabComponent,
    AdminTeamFilesTabComponent,
    AdminTeamCalendarTabComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule,
    DragDropModule,

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
      lucideUser,
      bootstrapPlus,
      lucideArrowRight,
      ionAttachOutline,
      lucideDownload
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
    
    HlmAlertDialogModule,
    BrnAlertDialogModule,
    
    NgApexchartsModule
  ],
  exports: [AdminDashboardComponent, AdminNavbarComponent],
})
export class AdminPagesModule {}
