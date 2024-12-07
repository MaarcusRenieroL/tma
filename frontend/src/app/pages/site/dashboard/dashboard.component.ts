import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../services/user/user.service';
import { toast } from 'ngx-sonner';
import { OrganizationService } from '../../../services/organization/organization.service';
import { Organization } from '../../../models/organization';
import { Task } from "../../../models/task";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  organization: Organization | null = null;
  tasks: Task[] | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit() {
    const isOnboarded = this.cookieService.get('syncTeam.isOnboarded');
    const userId = this.cookieService.get('syncTeam.userId');

    if (isOnboarded === 'false') {
      this.router.navigate(['/auth/onboarding']).then();
    }

    this.userService.getUserByUserId(userId).subscribe((response) => {
      if (response) {
        if (response.statusCode === 200) {
          toast.success(response.message);

          this.organizationService
            .getOrganizationByOrganizationId(response.data.organizationId)
            .subscribe((response) => {
              if (response) {
                if (response.statusCode === 200) {
                  toast.success(response.message);

                  this.organization = response.data;
                } else if (
                  [400, 401, 402, 403, 404, 405, 500].includes(
                    response.statusCode
                  )
                ) {
                  toast.success(response.message);
                }
              } else {
                toast.error('Something went wrong');
              }
            });
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
