import { Component, Input } from "@angular/core";
import { Project } from "../../../../models/project";

@Component({
  selector: "developer-project-card",
  templateUrl: "./developer-project-card.component.html",
})
export class DeveloperProjectCardComponent {
  @Input() project: Project | undefined;
}
