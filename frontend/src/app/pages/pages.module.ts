import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SiteModule } from "./site/site.module";
import { AuthPagesModule } from "./auth-pages/auth-pages.module";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LandingPageModule } from "../../components/pages/landing-page/landing-page.module";
import { AuthPagesRoutingModule } from "./auth-pages/auth-pages-routing.module";
import { SiteRoutingModule } from "./site/site-routing.module";

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule, SiteModule, AuthPagesModule, LandingPageModule, AuthPagesRoutingModule, SiteRoutingModule
  ], exports: [SiteModule, AuthPagesModule, LandingPageComponent]
})
export class PagesModule {}
