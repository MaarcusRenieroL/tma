import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignInComponent } from "./pages/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth/sign-up/sign-up.component";
import { EmailVerificationComponent } from "./pages/auth/email-verification/email-verification.component";
import { ResetPasswordComponent } from "./pages/auth/reset-password/reset-password.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "auth/sign-in", component: SignInComponent },
  { path: "auth/sign-up", component: SignUpComponent },
  { path: "auth/verify-email", component: EmailVerificationComponent },
  { path: "auth/reset-password", component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
