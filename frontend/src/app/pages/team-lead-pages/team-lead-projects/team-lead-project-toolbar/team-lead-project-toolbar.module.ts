import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLeadProjectCategoryComponent } from './team-lead-project-category/team-lead-project-category.component';
import { TeamLeadProjectSortByComponent } from './team-lead-project-sort-by/team-lead-project-sort-by.component';
import { TeamLeadProjectStatusComponent } from './team-lead-project-status/team-lead-project-status.component';
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";



@NgModule({
  declarations: [
    TeamLeadProjectCategoryComponent,
    TeamLeadProjectSortByComponent,
    TeamLeadProjectStatusComponent
  ],
	exports: [
		TeamLeadProjectCategoryComponent,
		TeamLeadProjectSortByComponent,
		TeamLeadProjectStatusComponent
	],
	imports: [
		CommonModule,
		HlmButtonDirective,
		HlmCardModule,
		HlmMenuModule,
		BrnMenuModule
	]
})
export class TeamLeadProjectToolbarModule { }
