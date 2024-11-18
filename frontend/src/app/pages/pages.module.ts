import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageModule } from "./landing-page/landing-page.module";
import { AdminPagesModule } from "./admin-pages/admin-pages.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule, AdminPagesModule
  ], exports: [LandingPageModule, AdminPagesModule]
})
export class PagesModule {
}
