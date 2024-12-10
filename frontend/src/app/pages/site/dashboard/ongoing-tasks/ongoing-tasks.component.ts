import { Component, Input } from "@angular/core";
import { Task } from "../../../../models/task";

@Component({
  selector: "ongoing-tasks",
  templateUrl: "./ongoing-tasks.component.html",
})
export class OngoingTasksComponent {
  @Input() tasks?: Task[];
}

