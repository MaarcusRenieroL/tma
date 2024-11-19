import { Component, Input } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'admin-project-card',
  templateUrl: './admin-project-card.component.html',
})
export class AdminProjectCardComponent {
  @Input() project: Project | undefined;
}
