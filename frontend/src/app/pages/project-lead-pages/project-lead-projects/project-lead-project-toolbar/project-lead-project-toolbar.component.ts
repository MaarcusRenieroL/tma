import { Component, Input } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'project-lead-project-toolbar',
  templateUrl: './project-lead-project-toolbar.component.html',
})
export class ProjectLeadProjectToolbarComponent {
  @Input() project: Project | undefined;
}
