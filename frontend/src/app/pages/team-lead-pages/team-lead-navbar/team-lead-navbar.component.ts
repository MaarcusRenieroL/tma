import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'team-lead-navbar',
  templateUrl: './team-lead-navbar.component.html',
})
export class TeamLeadNavbarComponent {
	isSheetOpen = false;
	
	links = [
		{ href: "/team-lead/dashboard", name: "Dashboard" },
		{ href: "/team-lead/projects", name: "Projects" },
		{ href: "/team-lead/users", name: "Users" },
		{ href: "/team-lead/tasks", name: "Tasks" },
		{ href: "/team-lead/reports", name: "Reports" },
		{ href: "/team-lead/notifications", name: "Notifications" },
		{ href: "/team-lead/settings", name: "Settings" },
		{ href: "/team-lead/logs", name: "Activity Logs" },
	];
	
	constructor(private router: Router) {}
	
	isActive(linkHref: string): boolean {
		return this.router.url === linkHref;
	}

}
