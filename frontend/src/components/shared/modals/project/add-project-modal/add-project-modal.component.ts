import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../app/services/projects/project.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
})
export class AddProjectModalComponent {
  @Input() organizationId: string = '';

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
    });

    console.log(this.organizationId);
  }

  submitForm() {
    if (this.projectForm.valid) {
      this.projectService
        .addProjectWithTeamId({
          project: this.projectForm.value,
          teamId: this.router.url.split('/')[2],
          userId: this.cookieService.get('userId'),
          organizationId: this.organizationId,
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
}
