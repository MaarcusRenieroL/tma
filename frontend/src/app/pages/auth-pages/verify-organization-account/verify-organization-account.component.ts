import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'verify-organization-account',
  templateUrl: './verify-organization-account.component.html',
})
export class VerifyOrganizationAccountComponent {
  verifyAccountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form group
    this.verifyAccountForm = this.fb.group({
      verificationCode: [
        '',
        [Validators.required, Validators.pattern(/^\d{6}$/)],
      ], // 6-digit code validation
    });
  }

  // Handle form submission
  onSubmit() {
    const userId = this.route.snapshot.params['userId'];
    if (this.verifyAccountForm.valid) {
      this.authService
        .verifyAccount({
          userId: userId,
          verificationCode: this.verifyAccountForm.value.verificationCode,
        })
        .subscribe((response) => {
          if (response) {
            if (response.statusCode === 200) {
              toast.success(response.message);
              this.router.navigate(['/auth/setup-account', userId]);
            } else if (
              [400, 401, 402, 403, 404, 500].includes(response.statusCode)
            ) {
              toast.error(response.message);
            }
          } else {
            toast.error('Something went wrong');
          }
        });
    }
  }
}
