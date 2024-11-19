import { Component } from '@angular/core';

@Component({
  selector: 'admin-team-sort-by',
  templateUrl: './admin-team-sort-by.component.html',
})
export class AdminTeamSortByComponent {
  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name_desc' },
    { name: 'Newest First', value: 'date_desc' },
    { name: 'Oldest First', value: 'date_asc' },
    { name: 'Priority (High to Low)', value: 'priority_desc' },
    { name: 'Priority (Low to High)', value: 'priority_asc' },
  ];
  
}
