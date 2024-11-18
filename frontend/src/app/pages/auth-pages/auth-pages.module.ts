import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { ComponentsModule } from "../../components/components.module";
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RouterLink } from "@angular/router";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    ForgotPasswordComponent
  ],
	imports: [
		CommonModule,
		ComponentsModule,
		RouterLink
	]
})
export class AuthPagesModule { }
