import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../app/models/user';
import { toast } from 'ngx-sonner';
import { TeamService } from '../../../../../app/services/team/team.service';

@Component({
  selector: 'add-user-to-team-modal',
  templateUrl: './add-user-to-team-modal.component.html',
})
export class AddUserToTeamModalComponent implements OnInit {
  @Input() organizationMembers: User[] = [];
  @Input() teamId?: string;

  addUserForm: FormGroup;
  selectedUsers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService
  ) {
    this.addUserForm = this.fb.group({
      selectedUsers: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {
    // Initialize form with empty array
    this.addUserForm.patchValue({
      selectedUsers: [],
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const selectedUsers = this.addUserForm.get('selectedUsers')?.value;

      this.teamService
        .addUsersToTeam({
          teamId: this.teamId!,
          userIds: selectedUsers,
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
      console.log('Selected users:', selectedUsers);
      toast.success('Users added successfully');
    } else {
      this.addUserForm.markAllAsTouched();
      toast.error('Please select at least one user');
    }
  }
}
