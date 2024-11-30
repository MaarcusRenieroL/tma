import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { toast } from "ngx-sonner";

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  resetPasswordForm: FormGroup;
  email!: string;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authService.forgotPassword({ email: this.resetPasswordForm.value.email }).subscribe((response) => {
        if (response) {
          toast.success("Check your inbox for email");
        } else {
          toast.error("Request failed")
        }
      })
    }
  }  
}
