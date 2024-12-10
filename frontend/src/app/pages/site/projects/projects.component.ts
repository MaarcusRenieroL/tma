import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { CookieService } from "ngx-cookie-service";
import { ProjectService } from "../../../services/projects/project.service";
import { UserService } from "../../../services/user/user.service";
import { toast } from "ngx-sonner";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  
  constructor(private cookieService: CookieService, private projectService: ProjectService, private userService: UserService) {
  }
  
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
  
  ngOnInit() {
    this.userService.getUserByUserId(this.cookieService.get("syncTeam.userId")).subscribe((response) => {
      if (response) {
        if (response.statusCode === 200) {
          this.projectService.getProjectsByOrganizationId(response.data.organizationId).subscribe((response) => {
            if (response) {
              if (response.statusCode === 200) {
                this.projects = response.data;
                
                this.projects.forEach((project) => {
                  if (project.userIds.includes(this.cookieService.get("syncTeam.userId"))) {
                    this.filteredProjects.push(project);
                  }
                })
                
                toast.success(response.message);
              } else if ([400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)) {
                toast.error(response.message);
              }
            } else {
              toast.error("Something went wrong");
            }
          })
        }
      }
    })
  }
}
