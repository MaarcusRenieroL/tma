import { Component } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
	selector: 'app-admin-projects',
	templateUrl: './admin-projects.component.html',
})
export class AdminProjectsComponent {
	projects: Project[] = [
		{
			name: 'E-Commerce Platform',
			description: 'A comprehensive platform for online shopping with user-friendly UI, robust backend, and secure payment integration.',
			status: 'not-started',
			priority: 'high',
			categories: [ 'web-development', 'ui-ux-design', 'e-commerce' ],
			domain: 'Retail',
		},
		{
			name: 'AI-Powered Chatbot',
			description: 'Develop an AI chatbot for customer support using natural language processing and machine learning.',
			status: 'in-progress',
			priority: 'medium',
			categories: [ 'ai-development', 'backend-engineering' ],
			domain: 'Technology',
		},
		{
			name: 'Corporate Website Revamp',
			description: 'Redesign the corporate website to improve branding, SEO, and overall user experience.',
			status: 'completed',
			priority: 'high',
			categories: [ 'web-design', 'seo-optimization' ],
			domain: 'Business',
		},
		{
			name: 'Healthcare Mobile App',
			description: 'A mobile app to connect patients with doctors for virtual consultations and appointment scheduling.',
			status: 'on-hold',
			priority: 'medium',
			categories: [ 'mobile-development', 'healthcare' ],
			domain: 'Health',
		},
		{
			name: 'Learning Management System',
			description: 'An online platform to deliver courses, track progress, and facilitate collaboration between students and instructors.',
			status: 'not-started',
			priority: 'high',
			categories: [ 'edtech', 'backend-development', 'frontend-development' ],
			domain: 'Education',
		},
	];
	
	categories = [
		{name: 'Web Development', value: 'web-development'},
		{name: 'UI/UX Design', value: 'ui-ux-design'},
		{name: 'E-Commerce', value: 'e-commerce'},
		{name: 'AI Development', value: 'ai-development'},
	];
	
	statusOptions = [
		{name: 'Not Started', value: 'not-started'},
		{name: 'In Progress', value: 'in-progress'},
		{name: 'Completed', value: 'completed'},
		{name: 'On Hold', value: 'on-hold'},
	];
	
	sortByOptions = [
		{name: 'Name (A to Z)', value: 'name_asc'},
		{name: 'Name (Z to A)', value: 'name_desc'},
		{name: 'Priority (High to Low)', value: 'priority_desc'},
		{name: 'Priority (Low to High)', value: 'priority_asc'},
	];
	
	searchQuery: string = '';
	selectedCategory!: string;
	selectedStatus!: string;
	selectedSortBy!: string;
	
	filteredProjects: Project[] = [ ...this.projects ];
	
	applyFilters() {
		this.filteredProjects = [ ...this.projects ];
		
		if (this.searchQuery) {
			this.filteredProjects = this.filteredProjects.filter((project) =>
				project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
				project.priority.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
				project.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
				project.domain.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
				project.status.toLowerCase().includes(this.searchQuery.toLowerCase())
			);
		}
		
		if (this.selectedCategory) {
			this.filteredProjects = this.filteredProjects.filter((project) =>
				project.categories.includes(this.selectedCategory)
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
	
	get selectedCategoryName(): string {
		return this.categories.find(category => category.value === this.selectedCategory)?.name || 'Category: All';
	}
	
	get selectedStatusName(): string {
		return this.statusOptions.find(status => status.value === this.selectedStatus)?.name || 'Status: All';
	}
	
	get selectedSortByName(): string {
		return this.sortByOptions.find(sortBy => sortBy.value === this.selectedSortBy)?.name || 'Sort By: Default';
	}
	
}
