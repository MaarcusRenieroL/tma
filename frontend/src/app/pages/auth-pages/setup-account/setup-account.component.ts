import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-setup-account',
  templateUrl: './setup-account.component.html',
})
export class SetupAccountComponent implements OnInit {
  setupAccountForm: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.setupAccountForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        location: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    // Get userId from URL
    this.userId = this.route.snapshot.params['userId'];
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.setupAccountForm.valid) {
      const formData = {
        ...this.setupAccountForm.value,
      };

      this.userService
        .setupAccountByUserId({
          userId: this.userId,
          user: formData,
        })
        .subscribe((response) => {
          if (response) {
            if (response.statusCode === 200) {
              toast.success(response.message);
              this.router.navigate(['/auth/sign-in']);
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
