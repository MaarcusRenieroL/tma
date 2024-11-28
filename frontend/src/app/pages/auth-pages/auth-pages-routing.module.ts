import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";

const routes: Routes = [
	{ path: "auth/sign-in", component: SignInComponent },
	{ path: "auth/sign-up", component: SignUpComponent },
	{ path: "auth/verify-email", component: VerifyEmailComponent },
	{ path: "auth/forgot-password", component: ForgotPasswordComponent },
	{ path: "auth/reset-password", component: PasswordResetComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AuthPagesRoutingModule {}
