import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NoAuthGuard } from '../../../no-auth.guard';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AuthGuard } from '../../../auth.guard';
import { VerifyOrganizationAccountComponent } from './verify-organization-account/verify-organization-account.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';

const routes: Routes = [
  {
    path: 'auth/sign-in',
    component: SignInComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/sign-up',
    component: SignUpComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/verify-email',
    component: VerifyEmailComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/reset-password',
    component: PasswordResetComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/onboarding',
    component: OnboardingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/verify-organization-account/:userId',
    component: VerifyOrganizationAccountComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'auth/setup-account/:userId',
    component: SetupAccountComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthPagesRoutingModule {}
