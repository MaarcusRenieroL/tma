import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "auth/sign-in", component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
