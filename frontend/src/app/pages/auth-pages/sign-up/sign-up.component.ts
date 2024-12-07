import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Initialize the form group
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]], // Email field with validation
        password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]], // Confirm Password
      },
      {
        validators: this.passwordsMatchValidator, // Custom validator to check if passwords match
      }
    );
  }

  // Custom validator to check if password and confirm password match
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  // Handle form submission
  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).subscribe((response) => {
        if (response) {
          if (response.statusCode === 201) {
            toast.success(response.message);

            this.cookieService.set('syncTeam.email', response.data.email);
            this.cookieService.set('syncTeam.userId', response.data.userId);
            this.cookieService.set('syncTeam.isVerified', 'false');

            this.router.navigate(['auth/verify-email']).then();
          } else if (
            [401, 402, 403, 404, 405, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });
    } else {
      this.signUpForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
}
