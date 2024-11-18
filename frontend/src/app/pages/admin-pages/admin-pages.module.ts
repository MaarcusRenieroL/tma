import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { hlmBtnDirective } from "@spartan-ng/ui-button-helm";
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetHeaderComponent,
} from "@spartan-ng/ui-sheet-helm";
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminNavbarComponent,
    AdminDashboardStatsComponent,
    AdminDashboardOngoingTasksComponent,
    AdminDashboardTopPerformersComponent,
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
    hlmBtnDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
  ],
  exports: [AdminDashboardComponent, AdminNavbarComponent],
})
export class AdminPagesModule {}
