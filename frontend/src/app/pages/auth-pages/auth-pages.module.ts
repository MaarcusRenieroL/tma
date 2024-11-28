import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { RouterLink } from "@angular/router";

const components = [
  SignInComponent, SignUpComponent, VerifyEmailComponent, PasswordResetComponent, ForgotPasswordComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule, HlmCardModule, HlmButtonDirective, HlmInputModule, RouterLink
  ], exports: [...components]
})
export class AuthPagesModule { }
