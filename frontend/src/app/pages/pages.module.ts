import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageModule } from "./landing-page/landing-page.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule
  ], exports: [LandingPageModule]
})
export class PagesModule {
}
