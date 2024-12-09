import { Component, Input } from '@angular/core';
import { Project } from '../../../../app/models/project';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input() project?: Project;
}
