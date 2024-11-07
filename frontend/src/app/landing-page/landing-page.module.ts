import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./landing-page.component";
import { HeaderComponent } from "./header/header.component";

import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { SplitButtonModule } from "primeng/splitbutton";
import { ToolbarModule } from "primeng/toolbar";
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { FeaturesSectionComponent } from "./features-section/features-section.component";
import { CardModule } from "primeng/card";

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
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
    CardModule,
  ],
})
export class LandingPageModule {}
