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
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.signUpForm.valid) {
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
      this.signUpForm.markAllAsTouched();
    }
  }
}
