import { Component } from '@angular/core';

@Component({
  selector: 'team-lead-project-sort-by',
  templateUrl: './team-lead-project-sort-by.component.html',
})
export class TeamLeadProjectSortByComponent {
  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name_desc' },
    { name: 'Newest First', value: 'date_desc' },
    { name: 'Oldest First', value: 'date_asc' },
    { name: 'Priority (High to Low)', value: 'priority_desc' },
    { name: 'Priority (Low to High)', value: 'priority_asc' },
  ];
}