import { Component } from '@angular/core';

@Component({
  selector: 'project-lead-project-category',
  templateUrl: './project-lead-project-category.component.html',
})
export class ProjectLeadProjectCategoryComponent {
  categories = [
    { name: "Development", value: "development" },
    { name: "Design", value: "design" },
    { name: "Marketing", value: "marketing" },
    { name: "Research", value: "research" },
    { name: "Operations", value: "operations" },
  ]
}