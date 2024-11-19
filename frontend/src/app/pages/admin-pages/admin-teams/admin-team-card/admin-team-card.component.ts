import { Component, Input } from '@angular/core';
import { Team } from "../../../../models/team";

@Component({
  selector: 'admin-team-card',
  templateUrl: './admin-team-card.component.html',
})
export class AdminTeamCardComponent {
  @Input() team: Team | undefined;
	
	getInitials(name: string) {
		return name.split(" ").map(word => word[0]).join(" ");
	}
}
