import { Component } from "@angular/core";

@Component({
  selector: "developer-project-category",
  templateUrl: "./developer-project-category.component.html",
})
export class DeveloperProjectCategoryComponent {
  categories = [
    { name: "Development", value: "development" },
    { name: "Design", value: "design" },
    { name: "Marketing", value: "marketing" },
    { name: "Research", value: "research" },
    { name: "Operations", value: "operations" },
  ];
}
