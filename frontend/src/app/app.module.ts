import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { AuthPagesRoutingModule } from './pages/auth-pages/auth-pages-routing.module';
import { AdminPagesRoutingModule } from "./pages/admin-pages/admin-pages-routing.module";
import { ProjectLeadRoutingModule } from "./pages/project-lead-pages/project-lead-routing.module";
import { TeamLeadRoutingModule } from "./pages/team-lead-pages/team-lead-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthPagesRoutingModule,
    AdminPagesRoutingModule,
    PagesModule,
    ProjectLeadRoutingModule,
    TeamLeadRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
