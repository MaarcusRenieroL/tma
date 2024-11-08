import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputOtpModule } from "primeng/inputotp";
import { PasswordModule } from "primeng/password";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { FormsModule } from "@angular/forms";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    InputOtpModule,
  ],
})
export class AuthModule {}
