import { Component, Input } from '@angular/core';
import { Task } from "../../../../models/task";

@Component({
  selector: 'team-overview-tab',
  templateUrl: './overview-tab.component.html',
})
export class OverviewTabComponent {
  @Input() unassignedTasksCount!: number;
  @Input() inProgressTasksCount!: number;
  @Input() completedTasksCount!: number;

}
