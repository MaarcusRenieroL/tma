import { Component } from '@angular/core';

@Component({
  selector: 'team-lead-project-category',
  templateUrl: './team-lead-project-category.component.html',
})
export class TeamLeadProjectCategoryComponent {
  categories = [
    { name: "Development", value: "development" },
    { name: "Design", value: "design" },
    { name: "Marketing", value: "marketing" },
    { name: "Research", value: "research" },
    { name: "Operations", value: "operations" },
  ]
}
