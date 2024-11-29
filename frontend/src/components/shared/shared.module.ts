import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsModule } from "./modals/modals.module";
import { CardsModule } from "./cards/cards.module";
import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";
import { AccountNavComponent } from "./navbar/account-nav/account-nav.component";
import { SiteNavbarComponent } from "./navbar/site-navbar.component";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { NgIconsModule } from "@ng-icons/core";
import { RouterModule } from "@angular/router";
import { HlmAvatarModule } from "@spartan-ng/ui-avatar-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { lucideLogOut } from "@ng-icons/lucide";

@NgModule({
  declarations: [
    AccountNavComponent, SiteNavbarComponent
  ],
  imports: [
    CommonModule, ModalsModule, CardsModule, HlmSheetModule, BrnSheetModule, HlmButtonDirective, NgIconsModule, RouterModule, HlmAvatarModule, HlmMenuModule, BrnMenuModule, NgIconsModule.withIcons({
      lucideLogOut
    })
  ], exports: [ AccountNavComponent, SiteNavbarComponent ]
})
export class SharedModule { }
