import { Component } from '@angular/core';
import { Project } from "../../../models/project";

@Component({
	selector: 'app-admin-projects',
	templateUrl: './admin-projects.component.html',
})
export class AdminProjectsComponent {
	projects: Project[] = [
		{
			name: "E-Commerce Platform",
			description: "A comprehensive platform for online shopping with user-friendly UI, robust backend, and secure payment integration.",
			status: "Not Started",
			priority: "High",
			categories: ["Web Development", "UI/UX Design", "E-Commerce"],
			domain: "Retail"
		},
		{
			name: "AI-Powered Chatbot",
			description: "Develop an AI chatbot for customer support using natural language processing and machine learning.",
			status: "In Progress",
			priority: "Medium",
			categories: ["AI Development", "Backend Engineering"],
			domain: "Technology"
		},
		{
			name: "Corporate Website Revamp",
			description: "Redesign the corporate website to improve branding, SEO, and overall user experience.",
			status: "Completed",
			priority: "High",
			categories: ["Web Design", "SEO Optimization"],
			domain: "Business"
		},
		{
			name: "Healthcare Mobile App",
			description: "A mobile app to connect patients with doctors for virtual consultations and appointment scheduling.",
			status: "On Hold",
			priority: "Medium",
			categories: ["Mobile Development", "Healthcare"],
			domain: "Health"
		},
		{
			name: "Learning Management System",
			description: "An online platform to deliver courses, track progress, and facilitate collaboration between students and instructors.",
			status: "Not Started",
			priority: "High",
			categories: ["EdTech", "Backend Development", "Frontend Development"],
			domain: "Education"
		}
	];
	
}
