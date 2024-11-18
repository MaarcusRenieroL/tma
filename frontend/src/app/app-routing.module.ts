import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "auth/sign-in", component: SignInComponent },
  { path: "auth/sign-up", component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
