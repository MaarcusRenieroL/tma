import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "landing-page-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  links = [
    { href: "", name: "Home" },
    { href: "#features", name: "Features" },
    { href: "#testimonials", name: "Testimonials" },
    { href: "#pricing", name: "Pricing" },
  ];

  constructor(private router: Router) {}

  isActive(linkHref: string): boolean {
    return this.router.url.substring(1) === linkHref;
  }
}
