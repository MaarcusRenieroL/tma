import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamLeadProjectCardComponent } from './team-lead-project-card/team-lead-project-card.component';
import { TeamLeadProjectToolbarComponent } from './team-lead-project-toolbar/team-lead-project-toolbar.component';
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { NgIconsModule } from "@ng-icons/core";
import { bootstrapPen, bootstrapTrash } from "@ng-icons/bootstrap-icons";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { HlmDialogModule } from "@spartan-ng/ui-dialog-helm";
import { BrnDialogModule } from "@spartan-ng/ui-dialog-brain";
import { TeamLeadProjectToolbarModule } from "./team-lead-project-toolbar/team-lead-project-toolbar.module";



@NgModule({
  declarations: [
    TeamLeadProjectCardComponent,
    TeamLeadProjectToolbarComponent
  ],
  exports: [
    TeamLeadProjectToolbarComponent,
    TeamLeadProjectCardComponent
  ],
  imports: [
    CommonModule, HlmCardModule, NgIconsModule.withIcons({
      bootstrapPen,
      bootstrapTrash
    }), HlmButtonDirective, HlmBadgeModule, HlmInputModule, HlmDialogModule, BrnDialogModule, TeamLeadProjectToolbarModule
  ]
})
export class TeamLeadProjectsModule { }
