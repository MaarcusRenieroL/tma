import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'settings-password-tab',
  templateUrl: './password-tab.component.html',
})
export class PasswordTabComponent {
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Custom Validator to check if passwords match
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  // Handle Form Submission
  onSubmit() {
    if (this.passwordForm.valid) {
      this.userService
        .changePassword({
          userId: this.cookieService.get('syncTeam.userId'),
          currentPassword: this.passwordForm.get('currentPassword')?.value,
          newPassword: this.passwordForm.get('newPassword')?.value,
          confirmNewPassword: this.passwordForm.get('confirmPassword')?.value,
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

  // Handle Cancel Action
  onCancel() {
    this.passwordForm.reset();
  }
}
