import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'project-lead-navbar',
  templateUrl: './project-lead-navbar.component.html',
})
export class ProjectLeadNavbarComponent {
  isSheetOpen = false;
  
  // Links array
  links = [
    { href: "/project-lead/dashboard", name: "Dashboard" },
    { href: "/project-lead/projects", name: "Projects" },
    { href: "/project-lead/teams", name: "Teams" },
    { href: "/project-lead/users", name: "Users" },
    { href: "/project-lead/tasks", name: "Tasks" },
    { href: "/project-lead/reports", name: "Reports" },
    { href: "/project-lead/notifications", name: "Notifications" },
    { href: "/project-lead/settings", name: "Settings" },
    { href: "/project-lead/logs", name: "Activity Logs" },
  ];
  
  constructor(private router: Router) {}
  
  // Check if the current route matches the link's href
  isActive(linkHref: string): boolean {
    return this.router.url === linkHref;
  }
}
