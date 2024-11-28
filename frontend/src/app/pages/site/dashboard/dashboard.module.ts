import { NgModule } from "@angular/core";
import { OngoingTasksComponent } from "./ongoing-tasks/ongoing-tasks.component";
import { StatsComponent } from "./stats/stats.component";
import { TopPerformersComponent } from "./top-performers/top-performers.component";
import { DashboardComponent } from "./dashboard.component";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { NgIconsModule } from "@ng-icons/core";
import { CommonModule } from "@angular/common";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { heroUser } from "@ng-icons/heroicons/outline";
import { bootstrapEye, bootstrapPen, bootstrapTrash } from "@ng-icons/bootstrap-icons";
import { SharedModule } from "../../../../components/shared/shared.module";

const components = [
	OngoingTasksComponent,
	StatsComponent,
	TopPerformersComponent,
	DashboardComponent
]

@NgModule({
	imports: [
		HlmCardModule,
		
		NgIconsModule.withIcons({
			heroUser,
			bootstrapEye,
			bootstrapPen,
			bootstrapTrash
		}),
		
		CommonModule,
		
		HlmButtonDirective,
		SharedModule,
	
	],
	declarations: [...components],
	exports: [...components]
})
export class DashboardModule {}