import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-password-reset',
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
  
  resetPasswordForm: FormGroup;
  resetPasswordToken!: string;
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],  // Password with validation
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],  // Confirm Password with validation
    }, {
      validators: this.passwordsMatchValidator  // Custom validator to check if passwords match
    });
  }
  
  // Custom validator to check if password and confirm password match
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  
  ngOnInit(): void {
    // Get the reset password token from the URL query parameters
    this.resetPasswordToken = this.route.snapshot.queryParamMap.get('token')!;
  }
  
  // Handle form submission
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log('Password reset token:', this.resetPasswordToken);
      console.log('Form submitted:', this.resetPasswordForm.value);
    } else {
      this.resetPasswordForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
  }
}
