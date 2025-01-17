import { NgModule } from '@angular/core';

import { AddProjectModalComponent } from './project/add-project-modal/add-project-modal.component';
import { DeleteProjectModalComponent } from './project/delete-project-modal/delete-project-modal.component';
import { AddTeamModalComponent } from './team/add-team-modal/add-team-modal.component';
import { DeleteTeamModalComponent } from './team/delete-team-modal/delete-team-modal.component';

import { HlmCardModule } from '@spartan-ng/ui-card-helm';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmBadgeModule } from '@spartan-ng/ui-badge-helm';

import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { CommonModule } from '@angular/common';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { NgIcon } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { AddUserToTeamModalComponent } from './team/add-user-to-team-modal/add-user-to-team-modal.component';
import { AddTaskModalComponent } from './task/add-task-modal/add-task-modal.component';
import { DeleteUserModalComponent } from './user/delete-user-modal/delete-user-modal.component';

const components = [
  AddProjectModalComponent,
  DeleteProjectModalComponent,
  AddTeamModalComponent,
  DeleteTeamModalComponent,
  AddUserToTeamModalComponent,
  AddTaskModalComponent,
  DeleteUserModalComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    HlmCardModule,
    HlmButtonDirective,
    HlmBadgeModule,
    BrnDialogModule,
    HlmDialogModule,
    HlmInputDirective,
    HlmLabelDirective,
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogTitleDirective,
    NgIcon,
    ReactiveFormsModule,
    CommonModule,
    HlmToasterComponent,
    BrnSelectModule,
    HlmSelectModule,
  ],
  exports: [...components],
})
export class ModalsModule {}
