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
	],
  exports: [AdminDashboardComponent, AdminNavbarComponent],
})
export class AdminPagesModule {}
