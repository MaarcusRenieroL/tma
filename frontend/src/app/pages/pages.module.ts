import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageModule } from "./landing-page/landing-page.module";
import { ProjectLeadPagesModule } from "./project-lead-pages/project-lead-pages.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule, ProjectLeadPagesModule
  ], exports: [LandingPageModule, ProjectLeadPagesModule]
})
export class PagesModule {
}
