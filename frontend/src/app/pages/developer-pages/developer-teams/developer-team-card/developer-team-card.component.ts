import { Component, Input } from "@angular/core";
import { Team } from "../../../../models/team";

@Component({
  selector: "developer-team-card",
  templateUrl: "./developer-team-card.component.html",
})
export class DeveloperTeamCardComponent {
  @Input() team: Team | undefined;

  getInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join(" ");
  }
}
