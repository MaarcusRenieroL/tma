import { Component, Input } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'team-lead-project-toolbar',
  templateUrl: './team-lead-project-toolbar.component.html',
})
export class TeamLeadProjectToolbarComponent {
  @Input() project: Project | undefined;
}
