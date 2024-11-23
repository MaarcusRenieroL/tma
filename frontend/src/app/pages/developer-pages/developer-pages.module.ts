import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { DeveloperDashboardComponent } from "./developer-dashboard/developer-dashboard.component";
import { DeveloperNavbarComponent } from "./developer-navbar/developer-navbar.component";
import { DeveloperAccountNavComponent } from "./developer-navbar/developer-account-nav/developer-account-nav.component";
import { DeveloperDashboardOngoingTasksComponent } from "./developer-dashboard/developer-dashboard-ongoing-tasks/developer-dashboard-ongoing-tasks.component";
import { DeveloperDashboardStatsComponent } from "./developer-dashboard/developer-dashboard-stats/developer-dashboard-stats.component";
import { DeveloperDashboardDailyScheduleComponent } from "./developer-dashboard/developer-dashboard-daily-schedule/developer-dashboard-daily-schedule.component";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import {
  bootstrapEye,
  bootstrapGlobe,
  bootstrapPen,
  bootstrapTrash,
} from "@ng-icons/bootstrap-icons";
import { heroUser } from "@ng-icons/heroicons/outline";
import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { RouterModule } from "@angular/router";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { ionMenuOutline } from "@ng-icons/ionicons";
import { DeveloperProjectsComponent } from "./developer-projects/developer-projects.component";
import { DeveloperProjectCardComponent } from "./developer-projects/developer-project-card/developer-project-card.component";
import { DeveloperProjectToolbarComponent } from "./developer-projects/developer-project-toolbar/developer-project-toolbar.component";
import { DeveloperProjectCategoryComponent } from "./developer-projects/developer-project-toolbar/developer-project-category/developer-project-category.component";
import { DeveloperProjectSortByComponent } from "./developer-projects/developer-project-toolbar/developer-project-sort-by/developer-project-sort-by.component";
import { DeveloperProjectStatusComponent } from "./developer-projects/developer-project-toolbar/developer-project-status/developer-project-status.component";
import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { DeveloperTeamsComponent } from "./developer-teams/developer-teams.component";
import { DeveloperTeamCardComponent } from "./developer-teams/developer-team-card/developer-team-card.component";
import { DeveloperTeamToolbarComponent } from "./developer-teams/developer-team-toolbar/developer-team-toolbar.component";

@NgModule({
  declarations: [
    DeveloperDashboardComponent,
    DeveloperNavbarComponent,
    DeveloperAccountNavComponent,
    DeveloperDashboardStatsComponent,
    DeveloperDashboardDailyScheduleComponent,
    DeveloperDashboardOngoingTasksComponent,
    DeveloperProjectsComponent,
    DeveloperProjectCardComponent,
    DeveloperProjectToolbarComponent,
    DeveloperProjectCategoryComponent,
    DeveloperProjectSortByComponent,
    DeveloperProjectStatusComponent,
    DeveloperTeamsComponent,
    DeveloperTeamCardComponent,
    DeveloperTeamToolbarComponent,
  ],
  imports: [
    CommonModule,
    NgIcon,
    NgIconsModule.withIcons({
      bootstrapGlobe,
      heroUser,
      ionMenuOutline,
      bootstrapEye,
      bootstrapPen,
      bootstrapTrash,
    }),
    HlmSheetModule,
    BrnSheetModule,
    HlmButtonDirective,
    HlmCardModule,
    RouterModule,
    BrnMenuModule,
    HlmMenuModule,
    HlmAvatarModule,
    NgOptimizedImage,
    HlmDialogModule,
    BrnDialogModule,
    HlmInputModule,
  ],
  exports: [
    DeveloperDashboardComponent,
    DeveloperNavbarComponent,
    DeveloperAccountNavComponent,
    DeveloperDashboardStatsComponent,
    DeveloperDashboardDailyScheduleComponent,
    DeveloperDashboardOngoingTasksComponent,
    DeveloperProjectsComponent,
    DeveloperProjectCardComponent,
    DeveloperProjectToolbarComponent,
    DeveloperProjectCategoryComponent,
    DeveloperProjectSortByComponent,
    DeveloperProjectStatusComponent,
    DeveloperTeamsComponent,
    DeveloperTeamCardComponent,
    DeveloperTeamToolbarComponent,
  ],
})
export class DeveloperPagesModule {}
