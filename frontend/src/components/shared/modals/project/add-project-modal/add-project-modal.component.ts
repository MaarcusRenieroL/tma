import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../app/services/projects/project.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../../../app/models/user';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
})
export class AddProjectModalComponent {
  @Input() organizationId?: string;
  @Input() teamMembers?: User[];

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.projectForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      deadline: ['', Validators.required],
      projectMembers: [[], Validators.required],
    });
  }

  submitForm() {
    if (this.projectForm.valid) {
      this.projectService
        .addProjectWithTeamId({
          project: {
            projectTitle: this.projectForm.get('projectTitle')?.value,
            projectDescription:
              this.projectForm.get('projectDescription')?.value,
            deadline: this.projectForm.get('deadline')?.value,
          },
          organizationId: this.organizationId!,
          userIds: this.projectForm.get('projectMembers')?.value,
          teamId: this.router.url.split('/')[2],
        })
        .subscribe((response) => {
          if (response) {
            if (response.statusCode === 200) {
              toast.success('Project added successfully');
            } else if (
              [400, 401, 403, 404, 500].includes(response.statusCode)
            ) {
              toast.error(response.message);
            }
          } else {
            toast.error('Failed to add project');
          }
        });
    }
  }
}
