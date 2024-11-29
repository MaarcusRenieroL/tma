import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HlmToasterComponent,
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
