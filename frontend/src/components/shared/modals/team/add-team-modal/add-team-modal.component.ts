import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTeamRequest } from "../../../../../app/payload/requests/team/create-team-request";
import { CookieService } from "ngx-cookie-service";
import { TeamService } from "../../../../../app/services/team/team.service";
import { toast } from "ngx-sonner";
import { BrnDialogRef } from "@spartan-ng/ui-dialog-brain";
import { Router } from "@angular/router";

@Component({
  selector: 'add-team-modal',
  templateUrl: './add-team-modal.component.html',
})
export class AddTeamModalComponent {
  createTeamForm: FormGroup;
  createTeamRequest!: CreateTeamRequest;
  
  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private teamService: TeamService, private router: Router) {
    this.createTeamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamDescription: ['', Validators.required],
    });
  }
  
  submitCreateTeamForm() {
    if (this.createTeamForm.valid) {
      this.createTeamRequest = {
        team: {
          teamName: this.createTeamForm.get("teamName")!.value,
          teamDescription: this.createTeamForm.get("teamDescription")!.value
        },
        userId: this.cookieService.get("syncTeam.userId")
      }
      
      console.log(this.createTeamRequest);
      
      this.teamService.createTeam(this.createTeamRequest).subscribe((response) => {
        if (response) {
          if (response.statusCode === 201) {
            toast.success(response.message)
          } else if ([400, 401, 403, 404, 500].includes(response.statusCode)) {
            toast.error(response.message)
          }
        } else {
          toast.error("Something went wrong")
        }
      });
      
      this.router.navigate(["/teams"]).then();
      
    }
    
    this.createTeamForm.reset();
  }
}
