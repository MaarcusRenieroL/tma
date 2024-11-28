import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RouterLink } from "@angular/router";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { HlmCardModule } from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
		VerifyEmailComponent
  ],
	imports: [
		CommonModule,
		RouterLink,
		
		HlmCardModule,
		
		HlmButtonDirective,
		HlmInputDirective
	]
})
export class AuthPagesModule { }
