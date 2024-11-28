import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TeamLeadDashboardOngoingTasksComponent
} from "./team-lead-dashboard-ongoing-tasks/team-lead-dashboard-ongoing-tasks.component";
import { TeamLeadDashboardStatsComponent } from "./team-lead-dashboard-stats/team-lead-dashboard-stats.component";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { bootstrapEye, bootstrapGlobe, bootstrapPen, bootstrapTrash } from "@ng-icons/bootstrap-icons";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import {
  TeamLeadDashboardTopPerformersComponent
} from "./team-lead-dashboard-top-performers/team-lead-dashboard-top-performers.component";
import { heroUser } from "@ng-icons/heroicons/outline";



@NgModule({
  declarations: [TeamLeadDashboardOngoingTasksComponent, TeamLeadDashboardStatsComponent, TeamLeadDashboardStatsComponent, TeamLeadDashboardTopPerformersComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ bootstrapGlobe, heroUser, bootstrapPen, bootstrapTrash, bootstrapEye }), HlmCardModule, HlmButtonDirective
  ],
  exports: [TeamLeadDashboardOngoingTasksComponent, TeamLeadDashboardStatsComponent, TeamLeadDashboardStatsComponent, TeamLeadDashboardTopPerformersComponent],
})
export class TeamLeadDashboardModule { }
