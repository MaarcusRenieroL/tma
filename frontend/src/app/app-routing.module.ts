import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";
import { PasswordResetComponent } from "./pages/auth-pages/password-reset/password-reset.component";
import { ForgotPasswordComponent } from "./pages/auth-pages/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./pages/auth-pages/verify-email/verify-email.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  
  { path: "auth/sign-in", component: SignInComponent },
  { path: "auth/sign-up", component: SignUpComponent },
  { path: "auth/reset-password", component: PasswordResetComponent },
  { path: "auth/forgot-password", component: ForgotPasswordComponent },
  { path: "auth/verify-email", component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
