import { NgModule } from "@angular/core";

import { AddProjectModalComponent } from "./project/add-project-modal/add-project-modal.component";
import { DeleteProjectModalComponent } from "./project/delete-project-modal/delete-project-modal.component";
import { AddTeamModalComponent } from "./team/add-team-modal/add-team-modal.component";
import { DeleteTeamModalComponent } from "./team/delete-team-modal/delete-team-modal.component";

import { HlmCardModule } from "@spartan-ng/ui-card-helm";

import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";

import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";
import { BrnSelectComponent } from "@spartan-ng/ui-select-brain";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import {
	HlmSelectContentDirective,
	HlmSelectOptionComponent,
	HlmSelectTriggerComponent, HlmSelectValueDirective
} from "@spartan-ng/ui-select-helm";
import { NgForOf } from "@angular/common";
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from "@spartan-ng/ui-alertdialog-brain";
import {
	HlmAlertDialogCancelButtonDirective,
	HlmAlertDialogComponent,
	HlmAlertDialogContentComponent,
	HlmAlertDialogDescriptionDirective,
	HlmAlertDialogFooterComponent,
	HlmAlertDialogHeaderComponent, HlmAlertDialogTitleDirective
} from "@spartan-ng/ui-alertdialog-helm";
import { NgIcon } from "@ng-icons/core";
import { ReactiveFormsModule } from "@angular/forms";

const components = [
	AddProjectModalComponent, DeleteProjectModalComponent, AddTeamModalComponent, DeleteTeamModalComponent
]

@NgModule({
	declarations: [...components],
	imports: [
		HlmCardModule, HlmButtonDirective, HlmBadgeModule, BrnDialogModule, HlmDialogModule, BrnSelectComponent, HlmInputDirective, HlmLabelDirective, HlmSelectContentDirective, HlmSelectOptionComponent, HlmSelectTriggerComponent, HlmSelectValueDirective, NgForOf, BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective, HlmAlertDialogCancelButtonDirective, HlmAlertDialogComponent, HlmAlertDialogContentComponent, HlmAlertDialogDescriptionDirective, HlmAlertDialogFooterComponent, HlmAlertDialogHeaderComponent, HlmAlertDialogTitleDirective, NgIcon, ReactiveFormsModule
	],
	exports: [...components],
})
export class ModalsModule { }