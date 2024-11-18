import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent {
  isSheetOpen = false;

  // Links array
  links = [
    { href: "/admin/dashboard", name: "Dashboard" },
    { href: "/admin/projects", name: "Projects" },
    { href: "/admin/teams", name: "Teams" },
    { href: "/admin/users", name: "Users" },
    { href: "/admin/tasks", name: "Tasks" },
    { href: "/admin/reports", name: "Reports" },
    { href: "/admin/notifications", name: "Notifications" },
    { href: "/admin/settings", name: "Settings" },
    { href: "/admin/logs", name: "Activity Logs" },
    { href: "/admin/profile", name: "Profile" },
  ];

  constructor(private router: Router) {}

  // Check if the current route matches the link's href
  isActive(linkHref: string): boolean {
    return this.router.url === linkHref;
  }
}
