import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../../app/services/projects/project.service';
import { UserService } from '../../../../../app/services/user/user.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { CookieService } from 'ngx-cookie-service';
import { User } from "../../../../../app/models/user";

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
})
export class AddProjectModalComponent {
  @Input('organizationId') organizationId?: string;
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
    });
  }
  
  submitForm() {
    if (this.projectForm.valid) {
      this.projectService.addProjectWithTeamId({
        project: this.projectForm.value,
        userId: this.cookieService.get("syncTeam.userId"),
        teamId: this.router.url.split("/")[2],
        organizationId: this.organizationId!,
      }).subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            toast.success(response.message);
          } else if ([400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)) {
            toast.error(response.message);
          }
        } else {
          toast.error("Something went wrong")
        }
      })
    }
  }
}
