import { Component } from '@angular/core';
import { Project } from "../../../../models/project";

@Component({
  selector: 'team-projects-tab',
  templateUrl: './projects-tab.component.html',
})
export class ProjectsTabComponent {
  projects: Project[] = [ {
    name: 'Fitness Tracker Dashboard',
    description: 'A dashboard to analyze fitness data collected from wearable devices and mobile apps.',
    status: 'completed',
    priority: 'medium',
    categories: [ 'healthcare', 'data-visualization', 'ui-ux-design' ],
    domain: 'Health',
  }, {
    name: 'Gaming Community Platform',
    description: 'A platform to connect gamers, create communities, and organize tournaments.',
    status: 'on-hold',
    priority: 'low',
    categories: [ 'web-development', 'social-media', 'ui-ux-design' ],
    domain: 'Gaming',
  }, {
    name: 'Personal Finance Manager',
    description: 'An application to help users track expenses, set budgets, and monitor financial goals.',
    status: 'in-progress',
    priority: 'high',
    categories: [ 'finance', 'mobile-development', 'data-analytics' ],
    domain: 'Finance',
  }, {
    name: 'Weather Forecasting Dashboard',
    description: 'A dashboard for displaying real-time weather updates and future forecasts with data visualizations.',
    status: 'completed',
    priority: 'medium',
    categories: [ 'data-visualization', 'web-development', 'api-integration' ],
    domain: 'Environment',
  }, {
    name: 'Crowdfunding Platform',
    description: 'A platform to support fundraising campaigns with integrated payment processing.',
    status: 'not-started',
    priority: 'high',
    categories: [ 'e-commerce', 'web-development', 'ui-ux-design' ],
    domain: 'Finance',
  } ];
  
  categories = this.getUniqueCategories();
  
  statusOptions = [ { name: 'Not Started', value: 'not-started' }, {
    name: 'In Progress',
    value: 'in-progress'
  }, { name: 'Completed', value: 'completed' }, { name: 'On Hold', value: 'on-hold' }, ];
  
  sortByOptions = [ { name: 'Name (A to Z)', value: 'name_asc' }, {
    name: 'Name (Z to A)',
    value: 'name_desc'
  }, { name: 'Priority (High to Low)', value: 'priority_desc' }, {
    name: 'Priority (Low to High)',
    value: 'priority_asc'
  }, ];
  
  searchQuery: string = '';
  selectedCategory!: string;
  selectedStatus!: string;
  selectedSortBy!: string;
  
  filteredProjects: Project[] = [ ...this.projects ];
  
  get selectedCategoryName(): string {
    return this.categories.find(category => category.value === this.selectedCategory)?.name || 'Category: All';
  }
  
  get selectedStatusName(): string {
    return this.statusOptions.find(status => status.value === this.selectedStatus)?.name || 'Status: All';
  }
  
  get selectedSortByName(): string {
    return this.sortByOptions.find(sortBy => sortBy.value === this.selectedSortBy)?.name || 'Sort By: Default';
  }
  
  applyFilters() {
    this.filteredProjects = [ ...this.projects ];
    
    if (this.searchQuery) {
      this.filteredProjects = this.filteredProjects.filter((project) => project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || project.priority.toLowerCase().includes(this.searchQuery.toLowerCase()) || project.description.toLowerCase().includes(this.searchQuery.toLowerCase()) || project.domain.toLowerCase().includes(this.searchQuery.toLowerCase()) || project.status.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
    
    if (this.selectedCategory) {
      this.filteredProjects = this.filteredProjects.filter((project) => project.categories.includes(this.selectedCategory));
    }
    
    if (this.selectedStatus) {
      this.filteredProjects = this.filteredProjects.filter((project) => project.status === this.selectedStatus);
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
          this.filteredProjects.sort((a, b) => b.priority.localeCompare(a.priority));
          break;
        case 'priority_asc':
          this.filteredProjects.sort((a, b) => a.priority.localeCompare(b.priority));
          break;
      }
    }
  }
  
  setCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
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
    this.selectedCategory = "";
    this.selectedStatus = "";
    this.selectedSortBy = "";
    this.applyFilters();
  }
  
  getUniqueCategories(): { name: string; value: string }[] {
    const uniqueCategories = new Set<string>();
    
    this.projects.forEach((project) => {
      project.categories.forEach((category) => {
        uniqueCategories.add(category);
      });
    });
    
    return Array.from(uniqueCategories).map((category) => ({
      name: this.formatCategoryName(category), value: category,
    }));
  }
  
  formatCategoryName(category: string): string {
    // Format category string to a more user-friendly name (e.g., 'web-development' -> 'Web Development')
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
}
