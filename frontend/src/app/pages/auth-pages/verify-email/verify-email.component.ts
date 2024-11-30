import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  
  verifyEmailForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Initialize the form group
    this.verifyEmailForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // 6-digit code validation
    });
  }
  
  // Handle form submission
  onSubmit() {
    if (this.verifyEmailForm.valid) {
      console.log('Verification code submitted:', this.verifyEmailForm.value);
      // Add your verification logic here
    } else {
      this.verifyEmailForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
  }
}
