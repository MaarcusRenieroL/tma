import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageModule } from "./landing-page/landing-page.module";
import { AuthPagesModule } from "./auth-pages/auth-pages.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule, AuthPagesModule
  ], exports: [LandingPageModule, AuthPagesModule]
})
export class PagesModule {
}
