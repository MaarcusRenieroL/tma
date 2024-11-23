import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { DeveloperPagesRoutingModule } from "./pages/developer-pages/developer-pages-routing.module";
import { DeveloperPagesModule } from "./pages/developer-pages/developer-pages.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    DeveloperPagesModule,
    DeveloperPagesRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
