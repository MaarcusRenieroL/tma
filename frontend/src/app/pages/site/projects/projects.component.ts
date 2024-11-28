import { Component } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
	selector: 'app-projects', templateUrl: './projects.component.html',
})
export class ProjectsComponent {
	projects: Project[] = [ {
		name: 'Social Media Analytics Tool',
		description: 'A web application to track, analyze, and report on social media performance metrics.',
		status: 'in-progress',
		priority: 'medium',
		categories: [ 'analytics', 'ui-ux-design', 'data-visualization' ],
		domain: 'Marketing',
	}, {
		name: 'Inventory Management System',
		description: 'A system to monitor stock levels, manage inventory records, and generate reports for businesses.',
		status: 'not-started',
		priority: 'high',
		categories: [ 'backend-development', 'web-development', 'data-management' ],
		domain: 'Supply Chain',
	}, {
		name: 'Virtual Reality Training Simulator',
		description: 'A VR application to provide immersive training experiences for industries like healthcare and manufacturing.',
		status: 'on-hold',
		priority: 'low',
		categories: [ 'virtual-reality', 'training', '3d-modelling' ],
		domain: 'Education',
	}, {
		name: 'Online Event Booking Platform',
		description: 'A platform to allow users to search, book, and manage event reservations seamlessly.',
		status: 'completed',
		priority: 'medium',
		categories: [ 'e-commerce', 'web-development', 'payment-integration' ],
		domain: 'Entertainment',
	}, {
		name: 'Blockchain-Based Voting System',
		description: 'A secure and decentralized voting system leveraging blockchain technology.',
		status: 'in-progress',
		priority: 'high',
		categories: [ 'blockchain', 'security', 'backend-engineering' ],
		domain: 'Government',
	}, {
		name: 'Remote Team Collaboration Tool',
		description: 'An application designed to facilitate communication, file sharing, and project management for remote teams.',
		status: 'not-started',
		priority: 'high',
		categories: [ 'collaboration', 'web-development', 'ui-ux-design' ],
		domain: 'Technology',
	}, {
		name: 'Smart Home Automation App',
		description: 'A mobile app to control smart home devices like lights, thermostats, and security systems.',
		status: 'on-hold',
		priority: 'medium',
		categories: [ 'iot', 'mobile-development', 'smart-devices' ],
		domain: 'Home Automation',
	}, {
		name: 'Employee Wellness Platform',
		description: 'A platform to monitor and improve employee wellness through health tracking and mental health resources.',
		status: 'completed',
		priority: 'high',
		categories: [ 'healthcare', 'web-development', 'ui-ux-design' ],
		domain: 'Corporate',
	}, {
		name: 'Travel Itinerary Planner',
		description: 'An app to create, organize, and share travel itineraries with real-time updates.',
		status: 'in-progress',
		priority: 'medium',
		categories: [ 'travel', 'mobile-development', 'ui-ux-design' ],
		domain: 'Tourism',
	}, {
		name: 'Smart Agriculture Monitoring System',
		description: 'A system to monitor soil health, crop conditions, and weather patterns to optimize farming.',
		status: 'not-started',
		priority: 'high',
		categories: [ 'iot', 'data-analytics', 'agriculture' ],
		domain: 'Agriculture',
	}, {
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
