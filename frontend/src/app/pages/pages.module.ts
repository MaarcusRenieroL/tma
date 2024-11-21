import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageModule } from "./landing-page/landing-page.module";
import { TeamLeadPagesModule } from "./team-lead-pages/team-lead-pages.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule, TeamLeadPagesModule
  ], exports: [LandingPageModule, TeamLeadPagesModule]
})
export class PagesModule {
}
