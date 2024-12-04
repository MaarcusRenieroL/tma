import { Component, Input } from '@angular/core';
import { Team } from "../../../../app/models/team";

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
})
export class TeamCardComponent {
  @Input() team!: Team;
  
  getInitials(name: string) {
    return name.split(" ").map(word => word[0]).join(" ");
  }
}
