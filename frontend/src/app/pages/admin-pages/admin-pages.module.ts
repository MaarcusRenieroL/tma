import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ComponentsModule } from "../../components/components.module";
import { NgIcon, NgIconsModule } from "@ng-icons/core";
import { heroUser } from '@ng-icons/heroicons/outline';
import { AdminDashboardStatsComponent } from './admin-dashboard/admin-dashboard-stats/admin-dashboard-stats.component';


@NgModule({
	declarations: [ AdminDashboardComponent, AdminNavbarComponent, AdminNavbarComponent, AdminDashboardStatsComponent ],
	imports: [ CommonModule, ComponentsModule, NgIconsModule.withIcons({ heroUser }) ],
	exports: [ AdminDashboardComponent, AdminNavbarComponent ],
})
export class AdminPagesModule {
}
