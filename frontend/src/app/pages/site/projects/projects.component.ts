import { Component } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects: Project[] = [];

  statusOptions = [
    { name: 'Not Started', value: 'not-started' },
    {
      name: 'In Progress',
      value: 'in-progress',
    },
    { name: 'Completed', value: 'completed' },
    { name: 'On Hold', value: 'on-hold' },
  ];

  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    {
      name: 'Name (Z to A)',
      value: 'name_desc',
    },
    { name: 'Priority (High to Low)', value: 'priority_desc' },
    {
      name: 'Priority (Low to High)',
      value: 'priority_asc',
    },
  ];

  searchQuery: string = '';
  selectedCategory!: string;
  selectedStatus!: string;
  selectedSortBy!: string;

  filteredProjects: Project[] = [...this.projects];

  get selectedStatusName(): string {
    return (
      this.statusOptions.find((status) => status.value === this.selectedStatus)
        ?.name || 'Status: All'
    );
  }

  get selectedSortByName(): string {
    return (
      this.sortByOptions.find((sortBy) => sortBy.value === this.selectedSortBy)
        ?.name || 'Sort By: Default'
    );
  }

  applyFilters() {
    this.filteredProjects = [...this.projects];

    if (this.searchQuery) {
      this.filteredProjects = this.filteredProjects.filter(
        (project) =>
          project.projectTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.priority
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          project.projectDescription
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          project.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedStatus) {
      this.filteredProjects = this.filteredProjects.filter(
        (project) => project.status === this.selectedStatus
      );
    }

    if (this.selectedSortBy) {
      switch (this.selectedSortBy) {
        case 'name_asc':
          this.filteredProjects.sort((a, b) => a.projectTitle.localeCompare(b.projectTitle));
          break;
        case 'name_desc':
          this.filteredProjects.sort((a, b) => b.projectTitle.localeCompare(a.projectTitle));
          break;
        case 'priority_desc':
          this.filteredProjects.sort((a, b) =>
            b.priority.localeCompare(a.priority)
          );
          break;
        case 'priority_asc':
          this.filteredProjects.sort((a, b) =>
            a.priority.localeCompare(b.priority)
          );
          break;
      }
    }
  }

  setStatus(status: string) {
    this.selectedStatus = status;
    this.applyFilters();
  }

  setSortBy(sortBy: string) {
    this.selectedSortBy = sortBy;
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedSortBy = '';
    this.applyFilters();
  }
}
