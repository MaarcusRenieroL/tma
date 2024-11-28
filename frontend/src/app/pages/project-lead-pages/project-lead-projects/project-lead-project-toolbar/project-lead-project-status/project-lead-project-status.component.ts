import { Component } from '@angular/core';

@Component({
  selector: 'project-lead-project-status',
  templateUrl: './project-lead-project-status.component.html',
})
export class ProjectLeadProjectStatusComponent {
  statusOptions = [
    {name: "Not Started", value: "not-started"},
    {name: "In Progress", value: "in-progress"},
    {name: "Completed", value: "completed"},
  ]
}
