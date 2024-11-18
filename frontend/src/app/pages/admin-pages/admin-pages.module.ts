import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ComponentsModule } from "../../components/components.module";
import { NgIcon } from "@ng-icons/core";


@NgModule({
	declarations: [ AdminDashboardComponent, AdminNavbarComponent, AdminNavbarComponent ],
	imports: [ CommonModule, ComponentsModule, NgIcon ],
	exports: [ AdminDashboardComponent, AdminNavbarComponent ],
})
export class AdminPagesModule {
}
