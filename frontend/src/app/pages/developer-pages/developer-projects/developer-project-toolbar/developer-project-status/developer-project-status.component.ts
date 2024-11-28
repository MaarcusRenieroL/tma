import { Component } from "@angular/core";

@Component({
  selector: "developer-project-status",
  templateUrl: "./developer-project-status.component.html",
})
export class DeveloperProjectStatusComponent {
  statusOptions = [
    { name: "Not Started", value: "not-started" },
    { name: "In Progress", value: "in-progress" },
    { name: "Completed", value: "completed" },
  ];
}
