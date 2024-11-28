import { Component } from '@angular/core';
import { Team } from "../../../models/team";

@Component({
	selector: 'admin-teams', templateUrl: './admin-teams.component.html',
})
export class AdminTeamsComponent {
	teams: Team[] = [
		{
			name: "Sales Team",
			description: "Responsible for promoting and selling the company's products and services.",
			createdAt: new Date("2021-05-01"),
			updatedAt: new Date("2023-08-15"),
			members: [ "Alice Johnson", "Bob Smith", "Charlie Brown", "Rachel Adams", "David Wilson" ],
			projects: [ "Marketing Campaign", "Product Launch", "Quarterly Sales Report", "New Market Strategy", "Client Outreach" ],
		},
		{
			name: "Engineering Team",
			description: "Responsible for developing and maintaining the company's software solutions.",
			createdAt: new Date("2023-01-15"),
			updatedAt: new Date("2023-11-01"),
			members: [ "Alice Johnson", "Bob Smith", "Charlie Brown", "Eve Williams", "Liam Harris", "Isabella Clark" ],
			projects: [ "Project Phoenix", "System Revamp", "Security Overhaul", "Feature Enhancements", "User Experience Optimization" ],
		},
		{
			name: "Marketing Team",
			description: "Handles branding, advertising, and customer outreach campaigns.",
			createdAt: new Date("2022-09-01"),
			updatedAt: new Date("2023-10-21"),
			members: [ "Diana Prince", "Eve Adams", "Sophia Miller", "Lucas Walker" ],
			projects: [ "Campaign Blitz", "New Product Launch", "Branding Overhaul", "Customer Acquisition Strategy", "Social Media Growth" ],
		},
		{
			name: "Product Management Team",
			description: "Manages the lifecycle of products and coordinates with cross-functional teams.",
			createdAt: new Date("2023-03-10"),
			updatedAt: new Date("2023-11-10"),
			members: [ "Frank Castle", "Grace Lee", "Henry Ford", "Rachel Green", "Tom Hanks" ],
			projects: [ "Feature Rollout", "Market Expansion", "Product Backlog", "Customer Feedback Loop", "Product Roadmap" ],
		},
		{
			name: "Customer Support Team",
			description: "Provides support and solutions to customer inquiries and issues.",
			createdAt: new Date("2021-11-25"),
			updatedAt: new Date("2023-10-05"),
			members: [ "Ivy Green", "Jack White", "Sophia Brown", "Noah White" ],
			projects: [ "Helpdesk Optimization", "Customer Satisfaction Survey", "Self-Service Portal", "Product FAQs", "Live Chat Support" ],
		},
		{
			name: "Research and Development Team",
			description: "Focuses on innovation and the development of new technologies.",
			createdAt: new Date("2020-06-14"),
			updatedAt: new Date("2023-09-30"),
			members: [ "Kelly Blue", "Luke Sky", "Mason Ford", "Emma Grey" ],
			projects: [ "AI Exploration", "Next-Gen Prototypes", "Blockchain Research", "VR Simulation", "IoT Integration" ],
		},
		{
			name: "Human Resources Team",
			description: "Handles recruitment, employee relations, benefits, and overall workforce management.",
			createdAt: new Date("2020-02-15"),
			updatedAt: new Date("2023-11-05"),
			members: [ "Anna Smith", "David Moore", "Olivia White", "Michael Brown", "Grace Lee" ],
			projects: [ "Employee Onboarding", "Annual Performance Review", "Wellness Programs", "Recruitment Strategy", "Employee Engagement" ],
		},
		{
			name: "Finance Team",
			description: "Responsible for managing the company's finances, including budgeting, reporting, and tax management.",
			createdAt: new Date("2019-07-12"),
			updatedAt: new Date("2023-10-25"),
			members: [ "Liam White", "Olivia Taylor", "Ethan Clark", "Zoe Harris" ],
			projects: [ "Annual Budgeting", "Financial Reporting", "Cash Flow Management", "Investment Strategy", "Risk Assessment" ],
		},
		{
			name: "Operations Team",
			description: "Manages day-to-day operations, logistics, and coordination across departments.",
			createdAt: new Date("2022-01-10"),
			updatedAt: new Date("2023-09-15"),
			members: [ "Mason Davis", "Sophia Miller", "Ryan Lee", "Grace White", "Luke Walker" ],
			projects: [ "Logistics Optimization", "Supply Chain Coordination", "Inventory Management", "Order Processing System", "Vendor Management" ],
		},
		{
			name: "IT Team",
			description: "Maintains the company’s IT infrastructure, software, and systems security.",
			createdAt: new Date("2021-08-01"),
			updatedAt: new Date("2023-11-02"),
			members: [ "James Harris", "Isabella Clark", "Ethan Gray", "Sophia Black", "Benjamin Young" ],
			projects: [ "Network Upgrade", "Cybersecurity Improvement", "Data Backup Solutions", "Software License Management", "System Monitoring" ],
		},
		{
			name: "Legal Team",
			description: "Handles all legal matters, including contracts, compliance, and litigation.",
			createdAt: new Date("2020-10-05"),
			updatedAt: new Date("2023-08-21"),
			members: [ "Samuel Walker", "Evelyn Lewis", "Diana Green" ],
			projects: [ "Contract Negotiation", "Regulatory Compliance", "Litigation Support", "IP Management", "Mergers and Acquisitions" ],
		},
		{
			name: "Design Team",
			description: "Responsible for the creative direction, branding, and design aspects of products and marketing.",
			createdAt: new Date("2019-09-10"),
			updatedAt: new Date("2023-07-18"),
			members: [ "Zoe Adams", "Mia White", "Lucas Black" ],
			projects: [ "Website Redesign", "Branding Initiative", "Mobile App UI/UX", "Marketing Campaign Design", "Product Packaging" ],
		},
		{
			name: "Business Development Team",
			description: "Focuses on identifying new business opportunities, partnerships, and revenue streams.",
			createdAt: new Date("2021-04-22"),
			updatedAt: new Date("2023-10-10"),
			members: [ "Jack Wilson", "Lily Scott", "Ava Johnson", "Samuel Green" ],
			projects: [ "New Business Partnership", "Market Expansion Strategy", "Client Relationship Management", "Lead Generation", "Global Outreach" ],
		},
		{
			name: "Content Team",
			description: "Manages content creation for marketing, blogs, social media, and internal communication.",
			createdAt: new Date("2022-03-18"),
			updatedAt: new Date("2023-10-30"),
			members: [ "Tom Harris", "Rachel Evans", "John King", "Megan White" ],
			projects: [ "Content Strategy", "Social Media Campaign", "Blog Post Series", "Video Marketing", "SEO Optimization" ],
		},
		{
			name: "Quality Assurance (QA) Team",
			description: "Ensures the quality and functionality of products through rigorous testing and review.",
			createdAt: new Date("2021-06-25"),
			updatedAt: new Date("2023-09-11"),
			members: [ "Ethan Green", "Ella Martinez", "Chloe Taylor", "Ryan Wilson" ],
			projects: [ "Product Testing", "Bug Fixes", "Automated Testing", "Regression Testing", "Quality Reports" ],
		},
		{
			name: "Public Relations (PR) Team",
			description: "Handles communication with media and the public to maintain the company’s image.",
			createdAt: new Date("2020-11-05"),
			updatedAt: new Date("2023-08-28"),
			members: [ "Grace Parker", "Lucas Thompson", "Megan Lee" ],
			projects: [ "Press Release", "Media Relations", "Crisis Management", "Brand Reputation", "Event Coordination" ],
		},
		{
			name: "Customer Success Team",
			description: "Works with customers to ensure satisfaction and long-term success using the company’s products/services.",
			createdAt: new Date("2022-07-18"),
			updatedAt: new Date("2023-10-14"),
			members: [ "Benjamin Lee", "Harper Kelly", "Sophia Adams" ],
			projects: [ "Customer Training", "Client Feedback", "User Engagement", "Product Support", "Retention Strategy" ],
		},
		{
			name: "Data Science Team",
			description: "Uses data analysis and machine learning to drive insights and business decisions.",
			createdAt: new Date("2020-09-13"),
			updatedAt: new Date("2023-09-22"),
			members: [ "Olivia King", "Mason Scott", "Amelia Carter" ],
			projects: [ "Predictive Analytics", "Data Optimization", "Customer Segmentation", "Market Trends", "Algorithm Optimization" ],
		},
		{
			name: "Compliance Team",
			description: "Ensures that the company adheres to legal regulations and industry standards.",
			createdAt: new Date("2021-03-05"),
			updatedAt: new Date("2023-09-30"),
			members: [ "Henry Brown", "Isabella Harris", "Victoria Brown" ],
			projects: [ "Compliance Audit", "Regulatory Reports", "ISO Certification", "Risk Management", "Policy Update" ],
		},
		{
			name: "Supply Chain Team",
			description: "Manages the sourcing, manufacturing, and distribution of products.",
			createdAt: new Date("2020-12-15"),
			updatedAt: new Date("2023-09-17"),
			members: [ "Charlotte Miller", "Noah Young", "Ethan Wood" ],
			projects: [ "Inventory Management", "Logistics Coordination", "Vendor Relations", "Supply Chain Optimization", "Product Distribution" ],
		}
	];
	
	
	sortByOptions = [
		{ name: 'Name (A to Z)', value: 'name_asc' },
		{ name: 'Name (Z to A)', value: 'name_desc' },
		{ name: "Created at (Earliest to Latest)", value: "created_at_asc" },
		{ name: "Created at (Latest to Earliest)", value: "created_at_desc" }
	];
	
	searchQuery: string = '';
	selectedSortBy!: string;
	filteredTeams: Team[] = [...this.teams];
	
	get selectedSortByName(): string {
		return this.sortByOptions.find(sortBy => sortBy.value === this.selectedSortBy)?.name || 'Sort By: Default';
	}
	
	applyFilters() {
		// Start with the unfiltered teams array
		this.filteredTeams = [...this.teams];
		
		// Apply search filter if a query exists
		if (this.searchQuery) {
			this.filteredTeams = this.filteredTeams.filter((team) =>
				team.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
				team.description.toLowerCase().includes(this.searchQuery.toLowerCase())
			);
		}
		
		// Apply sorting based on selectedSortBy
		if (this.selectedSortBy) {
			switch (this.selectedSortBy) {
				case 'name_asc':
					this.filteredTeams.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case 'name_desc':
					this.filteredTeams.sort((a, b) => b.name.localeCompare(a.name));
					break;
				case 'created_at_asc':
					this.filteredTeams.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
					break;
				case 'created_at_desc':
					this.filteredTeams.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
		this.selectedSortBy = '';
		this.applyFilters();
	}
}
