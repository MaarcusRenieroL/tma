import { Component } from '@angular/core';

@Component({
  selector: 'admin-project-toolbar',
  templateUrl: './admin-project-toolbar.component.html',
})
export class AdminProjectToolbarComponent {
  categories = [
    { name: "Development", value: "development" },
    { name: "Design", value: "design" },
    { name: "Marketing", value: "marketing" },
    { name: "Research", value: "research" },
    { name: "Operations", value: "operations" },
  ]
  
  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name_desc' },
    { name: 'Newest First', value: 'date_desc' },
    { name: 'Oldest First', value: 'date_asc' },
    { name: 'Priority (High to Low)', value: 'priority_desc' },
    { name: 'Priority (Low to High)', value: 'priority_asc' },
  ];
  
  statusOptions = [
    {name: "Not Started", value: "not-started"},
    {name: "In Progress", value: "in-progress"},
    {name: "Completed", value: "completed"},
  ]
}
