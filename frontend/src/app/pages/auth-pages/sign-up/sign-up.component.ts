import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Initialize the form group
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password field with validation
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],  // Confirm Password
    }, {
      validators: this.passwordsMatchValidator  // Custom validator to check if passwords match
    });
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
    } else {
      this.signUpForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
  }
}
