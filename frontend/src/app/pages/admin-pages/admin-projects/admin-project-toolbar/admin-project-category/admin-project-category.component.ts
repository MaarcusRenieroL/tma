import { Component } from '@angular/core';

@Component({
  selector: 'admin-project-category',
  templateUrl: './admin-project-category.component.html',
})
export class AdminProjectCategoryComponent {
  categories = [
    { name: "Development", value: "development" },
    { name: "Design", value: "design" },
    { name: "Marketing", value: "marketing" },
    { name: "Research", value: "research" },
    { name: "Operations", value: "operations" },
  ]
}
