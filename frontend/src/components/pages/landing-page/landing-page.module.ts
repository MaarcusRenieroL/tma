import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { FeaturesSectionComponent } from "./features-section/features-section.component";
import { CtaSectionComponent } from "./cta-section/cta-section.component";
import { TestimonialSectionComponent } from "./testimonial-section/testimonial-section.component";

import { NavbarComponent } from "./navbar/navbar.component";

import { NgIconsModule } from "@ng-icons/core";

import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

import { HlmSheetModule } from "@spartan-ng/ui-sheet-helm";
import { BrnSheetModule } from "@spartan-ng/ui-sheet-brain";

import { HlmCardModule } from "@spartan-ng/ui-card-helm";

import { RouterModule } from "@angular/router";

import { heroUsers } from "@ng-icons/heroicons/outline";
import {
  bootstrapClock,
  bootstrapGlobe,
  bootstrapMessenger,
} from "@ng-icons/bootstrap-icons";
import { ionMenuOutline } from "@ng-icons/ionicons";

const components = [
  HeroSectionComponent, FeaturesSectionComponent, CtaSectionComponent, TestimonialSectionComponent, NavbarComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule, NgIconsModule.withIcons({
      bootstrapGlobe,
      ionMenuOutline,
      bootstrapClock,
      bootstrapMessenger,
      heroUsers,
    }), HlmButtonDirective, HlmSheetModule, BrnSheetModule, RouterModule, HlmCardModule,
  ], exports: [components]
})
export class LandingPageModule { }
