import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HlmCardModule } from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { VerifyOrganizationAccountComponent } from './verify-organization-account/verify-organization-account.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
const components = [
  SignInComponent,
  SignUpComponent,
  VerifyEmailComponent,
  PasswordResetComponent,
  ForgotPasswordComponent,
  OnboardingComponent,
  VerifyOrganizationAccountComponent,
  SetupAccountComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    HlmCardModule,
    HlmButtonDirective,
    HlmInputModule,
    RouterLink,
    ReactiveFormsModule,
    HlmLabelDirective,
  ],
  exports: [...components],
})
export class AuthPagesModule {}
