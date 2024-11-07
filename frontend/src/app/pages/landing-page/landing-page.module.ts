import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page.component";
import { HeaderComponent } from "./components/header/header.component";

import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { SplitButtonModule } from "primeng/splitbutton";
import { ToolbarModule } from "primeng/toolbar";
import { HeroSectionComponent } from "./sections/hero-section/hero-section.component";
import { FeaturesSectionComponent } from "./sections/features-section/features-section.component";
import { CardModule } from "primeng/card";
import { TestimonialSectionComponent } from "./sections/testimonial-section/testimonial-section.component";
import { CarouselModule } from "primeng/carousel";
import { CtaSectionComponent } from "./sections/cta-section/cta-section.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    TestimonialSectionComponent,
    CtaSectionComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SidebarModule,
    CarouselModule,
    CardModule,
  ],
})
export class LandingPageModule {}
