import { Component, Input } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'project-lead-project-card',
  templateUrl: './project-lead-project-card.component.html',
})
export class ProjectLeadProjectCardComponent {
  @Input() project: Project | undefined;
}
