import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/project';
import { ProjectService } from '../../../../services/projects/project.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'team-projects-tab',
  templateUrl: './projects-tab.component.html',
})
export class ProjectsTabComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  projects: Project[] = [];

  statusOptions = [
    { name: 'Not Started', value: 'not-started' },
    { name: 'In Progress', value: 'in-progress' },
    { name: 'Completed', value: 'completed' },
    { name: 'On Hold', value: 'on-hold' },
  ];

  sortByOptions = [
    { name: 'Name (A to Z)', value: 'name_asc' },
    { name: 'Name (Z to A)', value: 'name_desc' },
    { name: 'Priority (High to Low)', value: 'priority_desc' },
    { name: 'Priority (Low to High)', value: 'priority_asc' },
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
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.priority
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          project.domain
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
          this.filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          this.filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
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
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.selectedSortBy = '';
    this.applyFilters();
  }

  ngOnInit(): void {
    this.projectService
      .getProjectsByTeamId(this.router.url.split('/').pop()!)
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            this.projects = response.data;

            toast.success(response.message);
          } else if (
            [400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });
  }
}
