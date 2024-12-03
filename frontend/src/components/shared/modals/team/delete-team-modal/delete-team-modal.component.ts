import { Component, Input } from '@angular/core';
import { TeamService } from "../../../../../app/services/team/team.service";
import { toast } from "ngx-sonner";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'delete-team-modal',
  templateUrl: './delete-team-modal.component.html',
})
export class DeleteTeamModalComponent {
  @Input() teamId!: string;
  
  constructor(private teamService: TeamService, private cookieService: CookieService) {
  }
  
  deleteTeam(ctx: any) {
    this.teamService.deleteTeam({ teamId: this.teamId, userId: this.cookieService.get("syncTeam.userId") }).subscribe((response) => {
      toast.success("Team deleted successfully")
    });
    
    ctx.close();
  }
}
