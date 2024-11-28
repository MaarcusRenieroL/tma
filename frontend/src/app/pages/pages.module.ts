import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageModule } from "./landing-page/landing-page.module";
import { AuthPagesModule } from "./auth-pages/auth-pages.module";
import { AdminPagesModule } from "./admin-pages/admin-pages.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, LandingPageModule, AuthPagesModule, AdminPagesModule
  ], exports: [LandingPageModule, AuthPagesModule, AdminPagesModule]
})
export class PagesModule {}
