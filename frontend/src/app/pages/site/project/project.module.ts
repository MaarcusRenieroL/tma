import { NgModule } from "@angular/core";

import { ProjectComponent } from "./project.component";
import { BoardTabComponent } from "./board-tab/board-tab.component";
import { FilesTabComponent } from "./files-tab/files-tab.component";

import { CommonModule } from "@angular/common";

import { OverviewTabModule } from "./overview-tab/overview-tab.module";
import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { NgIconsModule } from "@ng-icons/core";
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { BrnTabsModule } from "@spartan-ng/ui-tabs-brain";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SharedModule } from "../../../../components/shared/shared.module";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { FormsModule } from "@angular/forms";
import { CardsModule } from "../../../../components/shared/cards/cards.module";

const components = [ ProjectComponent, BoardTabComponent, FilesTabComponent, ];

@NgModule({
	declarations: [ ...components ],
	imports: [CommonModule, OverviewTabModule, HlmBadgeModule, HlmButtonDirective, NgIconsModule, HlmTabsModule, BrnTabsModule, DragDropModule, SharedModule, HlmInputModule, HlmMenuModule, BrnMenuModule, FormsModule, CardsModule],
	exports: [ ...components ]
})
export class ProjectModule {
}