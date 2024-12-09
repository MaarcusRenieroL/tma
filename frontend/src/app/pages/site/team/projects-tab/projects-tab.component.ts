import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Project } from '../../../../models/project';

@Component({
  selector: 'team-projects-tab',
  templateUrl: './projects-tab.component.html',
})
export class ProjectsTabComponent implements OnInit, OnChanges {
  @Input() projects: Project[] = [];

  filteredProjects: Project[] = [];

  statusOptions = [
    { name: 'Not Started', value: 'not-started' },
    { name: 'In Progress', value: 'in-progress' },
    { name: 'Completed', value: 'completed' },
    { name: 'On Hold', value: 'on-hold' },
  ];

  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name_desc' },
  ];

  searchQuery: string = '';
  selectedCategory!: string;
  selectedSortBy!: string;

  get selectedSortByName(): string {
    return (
      this.sortByOptions.find((sortBy) => sortBy.value === this.selectedSortBy)
        ?.name || 'Sort By: Default'
    );
  }

  ngOnInit(): void {
    this.filteredProjects = [...this.projects];
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projects'] && changes['projects'].currentValue) {
      this.filteredProjects = [...this.projects];
      this.applyFilters();
    }
  }

  applyFilters() {
    this.filteredProjects = [...this.projects];

    if (this.searchQuery) {
      this.filteredProjects = this.filteredProjects.filter(
        (project) =>
          project.projectTitle
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          project.projectDescription
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedSortBy) {
      switch (this.selectedSortBy) {
        case 'name_asc':
          this.filteredProjects.sort((a, b) =>
            a.projectTitle.localeCompare(b.projectTitle)
          );
          break;
        case 'name_desc':
          this.filteredProjects.sort((a, b) =>
            b.projectTitle.localeCompare(a.projectTitle)
          );
          break;
      }
    }
  }

  setSortBy(sortBy: string) {
    this.selectedSortBy = sortBy;
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedSortBy = '';
    this.applyFilters();
  }
}
