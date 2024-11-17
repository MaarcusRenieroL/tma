import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgIconsModule } from "@ng-icons/core";
import { bootstrapGlobe, bootstrapClock, bootstrapMessenger } from "@ng-icons/bootstrap-icons";
import { ionMenuOutline, ionHomeOutline } from "@ng-icons/ionicons";
import { heroUsers } from "@ng-icons/heroicons/outline"
import { ComponentsModule } from "../../components/components.module";
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent,
    HeroSectionComponent,
    FeaturesSectionComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ bootstrapGlobe, ionMenuOutline, ionHomeOutline, bootstrapClock, bootstrapMessenger, heroUsers }),
    ComponentsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class LandingPageModule {
}
