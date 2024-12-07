import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'auth-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form group
    this.verifyEmailForm = this.fb.group({
      verificationCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{6}$/)],
      ], // 6-digit code validation
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.verifyEmailForm.valid) {
      this.authService
        .verifyEmail({
          token: this.verifyEmailForm.get('verificationCode')!.value,
          userId: this.cookieService.get('syncTeam.userId'),
        })
        .subscribe((response) => {
          if (response) {
            if (response.statusCode === 200) {
              this.cookieService.set('syncToken.isVerified', 'true');
              this.router.navigate(['/auth/sign-in']).then();
              toast.success(response.message);
            } else if (
              [400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
            ) {
              toast.error(response.message);
            }
          } else {
            toast.error('Something went wrong');
          }
        });
    } else {
      this.verifyEmailForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  ngOnInit(): void {
    this.authService
      .sendVerificationCode({
        email: this.cookieService.get('syncTeam.email'),
      })
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            toast.success(response.message);
          } else if (
            [400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });
  }
}
