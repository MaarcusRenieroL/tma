import { NgModule } from '@angular/core';
import { BoardTabComponent } from './board-tab/board-tab.component';
import { CalendarTabComponent } from './calendar-tab/calendar-tab.component';
import { FilesTabComponent } from './files-tab/files-tab.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { ProjectsTabComponent } from './projects-tab/projects-tab.component';
import { TeamComponent } from './team.component';
import { CommonModule } from '@angular/common';
import { HlmCardModule } from '@spartan-ng/ui-card-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnMenuModule } from '@spartan-ng/ui-menu-brain';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmBadgeModule } from '@spartan-ng/ui-badge-helm';
import { HlmAvatarModule } from '@spartan-ng/ui-avatar-helm';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../../../components/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmDialogModule } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogModule } from '@spartan-ng/ui-dialog-brain';
import { HlmTabsModule } from '@spartan-ng/ui-tabs-helm';
import { BrnTabsModule } from '@spartan-ng/ui-tabs-brain';
import { NgIconsModule } from '@ng-icons/core';
import { CardsModule } from '../../../../components/shared/cards/cards.module';
import { lucideMessageSquare } from '@ng-icons/lucide';
import { bootstrapPlus } from '@ng-icons/bootstrap-icons';
import { ionAttachOutline } from '@ng-icons/ionicons';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import { BrnHoverCardModule } from '@spartan-ng/ui-hovercard-brain';
import { OverviewTabModule } from '../project/overview-tab/overview-tab.module';
import { ModalsModule } from '../../../../components/shared/modals/modals.module';

const components = [
  BoardTabComponent,
  CalendarTabComponent,
  FilesTabComponent,
  OverviewTabComponent,
  ProjectsTabComponent,
  TeamComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    SharedModule,
    HlmButtonDirective,
    HlmCardModule,
    HlmMenuModule,
    BrnMenuModule,
    HlmInputModule,
    HlmBadgeModule,
    HlmAvatarModule,
    HlmDialogModule,
    BrnDialogModule,
    HlmTabsModule,
    BrnTabsModule,
    NgIconsModule.withIcons({
      bootstrapPlus,
      ionAttachOutline,
      lucideMessageSquare,
    }),
    CardsModule,
    CommonModule,
    HlmHoverCardModule,
    BrnHoverCardModule,
    OverviewTabModule,
    ModalsModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class TeamModule {}
