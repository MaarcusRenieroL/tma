import { NgModule } from "@angular/core";

import { AssigneeGraphComponent } from "./assignee-graph/assignee-graph.component";
import { CompletedTasksComponent } from "./completed-tasks/completed-tasks.component";
import { RecentActivitiesComponent } from "./recent-activities/recent-activities.component";
import { StatsComponent } from "./stats/stats.component";
import { WorkloadGraphComponent } from "./workload-graph/workload-graph.component";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "../../../../../components/shared/shared.module";

import { HlmInputModule } from "@spartan-ng/ui-input-helm";

import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";

import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

import { HlmCardModule } from "@spartan-ng/ui-card-helm";

import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";

import { NgApexchartsModule } from "ng-apexcharts";

import { NgOptimizedImage } from "@angular/common";
import { NgIconsModule } from "@ng-icons/core";
import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";
import { OverviewTabComponent } from "./overview-tab.component";

const components = [ AssigneeGraphComponent, CompletedTasksComponent, RecentActivitiesComponent, StatsComponent, WorkloadGraphComponent, OverviewTabComponent ]

@NgModule({
	declarations: [ ...components ],
	imports: [
		SharedModule,
		
		DragDropModule,
		FormsModule,
		
		HlmInputModule,
		
		HlmMenuModule,
		BrnMenuModule,
		
		HlmButtonDirective,
		
		HlmCardModule,
		
		HlmAvatarModule,
		
		NgApexchartsModule,
		
		NgOptimizedImage,
		
		NgIconsModule,
		
		HlmBadgeModule
	],
	exports: [ ...components ]
})
export class OverviewTabModule {
}