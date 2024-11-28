import { Component } from '@angular/core';

@Component({
  selector: 'team-lead-project-status',
  templateUrl: './team-lead-project-status.component.html',
})
export class TeamLeadProjectStatusComponent {
  statusOptions = [
    {name: "Not Started", value: "not-started"},
    {name: "In Progress", value: "in-progress"},
    {name: "Completed", value: "completed"},
  ]
}
