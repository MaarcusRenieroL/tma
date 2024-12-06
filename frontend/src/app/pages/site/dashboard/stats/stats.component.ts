import { Component, Input } from '@angular/core';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent {
  @Input() activeEmployees: number | undefined = undefined;
  @Input() projectCount: number | undefined = undefined;
  @Input() pendingTasks: number | undefined = undefined;
  @Input() overdueTasks: number | undefined = undefined;
}
