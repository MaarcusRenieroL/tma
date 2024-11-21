import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLeadNavbarComponent } from './team-lead-navbar/team-lead-navbar.component';
import { TeamLeadDashboardComponent } from './team-lead-dashboard/team-lead-dashboard.component';
import { TeamLeadAccountNavComponent } from './team-lead-navbar/team-lead-account-nav/team-lead-account-nav.component';
import { NgIconsModule } from "@ng-icons/core";
import { bootstrapGlobe } from "@ng-icons/bootstrap-icons";
import { RouterModule } from "@angular/router";
import { TeamLeadDashboardModule } from "./team-lead-dashboard/team-lead-dashboard.module";
import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { TeamLeadProjectsComponent } from './team-lead-projects/team-lead-projects.component';
import { TeamLeadProjectsModule } from "./team-lead-projects/team-lead-projects.module";


@NgModule({
	declarations: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
  TeamLeadProjectsComponent,
	],
	imports: [
		CommonModule, NgIconsModule.withIcons({bootstrapGlobe}), RouterModule, TeamLeadDashboardModule, HlmSheetModule, BrnSheetModule, HlmButtonDirective, HlmAvatarModule, HlmMenuModule, BrnMenuModule, TeamLeadProjectsModule
	], exports: [
		TeamLeadNavbarComponent,
		TeamLeadDashboardComponent,
		TeamLeadAccountNavComponent,
		TeamLeadDashboardModule
	],
})
export class TeamLeadPagesModule {
}
