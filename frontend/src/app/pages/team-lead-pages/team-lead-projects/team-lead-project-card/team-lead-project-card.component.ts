import { Component, Input } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'team-lead-project-card',
  templateUrl: './team-lead-project-card.component.html',
})
export class TeamLeadProjectCardComponent {
  @Input() project: Project | undefined;
  
}
