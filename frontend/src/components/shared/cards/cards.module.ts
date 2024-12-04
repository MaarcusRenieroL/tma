import { NgModule } from "@angular/core";

import { FileCardComponent } from "./file-card/file-card.component";
import { TeamCardComponent } from "./team-card/team-card.component";
import { ProjectCardComponent } from "./project-card/project-card.component";

import { HlmCardModule } from "@spartan-ng/ui-card-helm";

import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";

import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";

import { ModalsModule } from "../modals/modals.module";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";

import { NgIconsModule } from "@ng-icons/core";
import { TaskCardComponent } from './task-card/task-card.component';
import {
	HlmTabsComponent,
	HlmTabsContentDirective,
	HlmTabsListComponent,
	HlmTabsTriggerDirective
} from "@spartan-ng/ui-tabs-helm";
import { heroCalendar, heroEllipsisHorizontal } from "@ng-icons/heroicons/outline";
import { lucideFile, lucideHardDrive, lucideAlertCircle } from "@ng-icons/lucide";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { UserCardComponent } from './user-card/user-card.component';
import {
	BrnHoverCardModule,
} from "@spartan-ng/ui-hovercard-brain";
import { HlmHoverCardModule } from "@spartan-ng/ui-hovercard-helm";
import {
	HlmAlertDescriptionDirective,
	HlmAlertDirective,
	HlmAlertIconDirective,
	HlmAlertModule,
	HlmAlertTitleDirective
} from "@spartan-ng/ui-alert-helm";

const components = [ FileCardComponent, TeamCardComponent, ProjectCardComponent, TaskCardComponent, UserCardComponent ]

@NgModule({
	declarations: [ ...components ],
	imports: [ HlmCardModule, HlmButtonDirective, HlmBadgeModule, HlmDialogModule, BrnDialogModule, HlmHoverCardModule, BrnHoverCardModule, NgIconsModule.withIcons({
		heroEllipsisHorizontal,
		heroCalendar,
		lucideHardDrive,
		lucideFile, lucideAlertCircle
	}), HlmAvatarModule, HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective, ModalsModule, CommonModule, RouterLink, HlmAlertDirective, HlmAlertIconDirective, HlmAlertTitleDirective, HlmAlertDescriptionDirective ],
	exports: [ ...components ]
})
export class CardsModule {
}