import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { SignInRequest } from "../../../payload/requests/auth/sign-in-request";
import { toast } from "ngx-sonner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  
  signInForm: FormGroup;
  
  constructor(private authService: AuthService, private signInFormBuilder: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.signInForm = this.signInFormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.signInForm.valid) {
      this.signIn({
        username: this.signInForm.get('username')!.value,
        password: this.signInForm.get('password')!.value,
      })
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
  
  signIn(signInRequest: SignInRequest) {
    this.authService.signIn(signInRequest).subscribe((response) => {
      if (response) {
        if (response.data.token) {
          this.cookieService.set('syncTeam.token', response.data.token);
          this.cookieService.set("syncTeam.userId", response.data.userId);
          this.cookieService.set("syncTeam.isOnboarded", response.data.onboarded.toString());
          this.router.navigate(['/dashboard']).then();
        } else {
          toast.error("Token not found")
        }
        toast.success(response.message)
      } else {
        toast.error("Sign in failed")
      }
    });
  }
}
