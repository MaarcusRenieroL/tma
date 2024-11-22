import { Component, Input } from '@angular/core';
import { Team } from "../../../../models/team";

@Component({
  selector: 'project-lead-team-card',
  templateUrl: './project-lead-team-card.component.html',
})
export class ProjectLeadTeamCardComponent {
  @Input() team: Team | undefined;
	
	getInitials(name: string) {
		return name.split(" ").map(word => word[0]).join(" ");
	}
}
