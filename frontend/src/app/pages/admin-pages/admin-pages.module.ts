import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ComponentsModule } from "../../components/components.module";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { heroUser } from '@ng-icons/heroicons/outline';
import { bootstrapEye, bootstrapPen, bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { AdminDashboardStatsComponent } from './admin-dashboard/admin-dashboard-stats/admin-dashboard-stats.component';
import { AdminDashboardOngoingTasksComponent } from './admin-dashboard/admin-dashboard-ongoing-tasks/admin-dashboard-ongoing-tasks.component';
import { AdminDashboardTopPerformersComponent } from './admin-dashboard/admin-dashboard-top-performers/admin-dashboard-top-performers.component';


@NgModule({
	declarations: [ AdminDashboardComponent, AdminNavbarComponent, AdminNavbarComponent, AdminDashboardStatsComponent, AdminDashboardOngoingTasksComponent, AdminDashboardTopPerformersComponent ],
	imports: [ CommonModule, ComponentsModule, NgIconsModule.withIcons({ heroUser, bootstrapEye, bootstrapPen, bootstrapTrash }) ],
	exports: [ AdminDashboardComponent, AdminNavbarComponent ],
})
export class AdminPagesModule {
}
