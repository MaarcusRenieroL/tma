import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { NgIconsModule } from "@ng-icons/core";
import {
  bootstrapGlobe,
  bootstrapClock,
  bootstrapMessenger,
} from "@ng-icons/bootstrap-icons";
import { ionMenuOutline, ionHomeOutline } from "@ng-icons/ionicons";
import { heroUsers } from "@ng-icons/heroicons/outline";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { FeaturesSectionComponent } from "./features-section/features-section.component";
import { TestimonialSectionComponent } from "./testimonial-section/testimonial-section.component";
import { CtaSectionComponent } from "./cta-section/cta-section.component";
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from "@spartan-ng/ui-sheet-helm";
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from "@spartan-ng/ui-sheet-brain";
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LandingPageComponent,
    NavbarComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    TestimonialSectionComponent,
    CtaSectionComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      bootstrapGlobe,
      ionMenuOutline,
      ionHomeOutline,
      bootstrapClock,
      bootstrapMessenger,
      heroUsers,
    }),
    RouterModule,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
  ],
  exports: [NavbarComponent],
})
export class LandingPageModule {}
