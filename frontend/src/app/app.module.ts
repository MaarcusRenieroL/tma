import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingPageModule } from "./pages/landing-page/landing-page.module";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { AuthModule } from "./pages/auth/auth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LandingPageModule, AuthModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
