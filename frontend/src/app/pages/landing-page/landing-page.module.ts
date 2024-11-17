import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIconsModule } from "@ng-icons/core";
import { bootstrapGlobe } from "@ng-icons/bootstrap-icons";
import { ionMenuOutline, ionHomeOutline } from "@ng-icons/ionicons";
import { NgpButton } from 'ng-primitives/button';
import { SheetModule } from "../../components/sheet/sheet.module";


@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ bootstrapGlobe, ionMenuOutline, ionHomeOutline }),
    NgpButton,
    SheetModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class LandingPageModule {
}
