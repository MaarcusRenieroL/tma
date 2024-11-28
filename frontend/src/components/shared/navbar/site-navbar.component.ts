import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "site-navbar",
  templateUrl: "./site-navbar.component.html",
})
export class SiteNavbarComponent {
  isSheetOpen = false;

  // Links array
  links = [
    { href: "/dashboard", name: "Dashboard" },
    { href: "/projects", name: "Projects" },
    { href: "/teams", name: "Teams" },
    { href: "/users", name: "Users" },
    { href: "/tasks", name: "Tasks" },
    { href: "/reports", name: "Reports" },
    { href: "/notifications", name: "Notifications" },
    { href: "/logs", name: "Activity Logs" },
    { href: "/settings", name: "Settings" },
  ];

  constructor(private router: Router) {}

  // Check if the current route matches the link's href
  isActive(linkHref: string): boolean {
    return this.router.url === linkHref;
  }
}
