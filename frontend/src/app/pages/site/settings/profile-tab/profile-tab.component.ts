import { Component, OnInit } from '@angular/core';
import { toast } from 'ngx-sonner';
import { User } from '../../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'settings-profile-tab',
  templateUrl: './profile-tab.component.html',
})
export class ProfileTabComponent implements OnInit {
  user: User | null = null;

  profileForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserByUserId(this.cookieService.get('syncTeam.userId'))
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            this.user = response.data;

            this.profileForm.patchValue({
              name: this.user.name || '',
              email: this.user.email || '',
              role: this.user.role || '',
              username: this.user.username || '',
            });
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

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [{ value: '', disabled: true }, Validators.required],
      username: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userService
        .updateUserByUserId(this.profileForm.value)
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
}
