import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from "./pages/pages.module";
import { ProjectLeadRoutingModule } from "./pages/project-lead-pages/project-lead-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ProjectLeadRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
