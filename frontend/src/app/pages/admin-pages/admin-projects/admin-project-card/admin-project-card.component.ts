import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'admin-project-card',
  templateUrl: './admin-project-card.component.html',
})
export class AdminProjectCardComponent implements OnInit {
  @Input() project: Project | undefined;
 
  ngOnInit() {
    console.log(this.project?.categories)
  }
}
