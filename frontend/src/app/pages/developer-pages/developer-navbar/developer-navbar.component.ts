import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "developer-navbar",
  templateUrl: "./developer-navbar.component.html",
})
export class DeveloperNavbarComponent {
  isSheetOpen = false;

  // Links array
  links = [
    { href: "/developer/dashboard", name: "Dashboard" },
    { href: "/developer/projects", name: "Projects" },
    { href: "/developer/teams", name: "Teams" },
    { href: "/developer/tasks", name: "Tasks" },
    { href: "/developer/notifications", name: "Notifications" },
    { href: "/developer/settings", name: "Settings" },
  ];

  constructor(private router: Router) {}

  // Check if the current route matches the link's href
  isActive(linkHref: string): boolean {
    return this.router.url === linkHref;
  }
}
