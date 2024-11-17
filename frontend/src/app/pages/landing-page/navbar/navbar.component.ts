import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isSheetOpen = false;

  // Links array
  links = [
    { href: '/', name: 'Home' },
    { href: '/features', name: 'Features' },
    { href: '/testimonials', name: 'Testimonials' },
    { href: '/pricing', name: 'Pricing' },
  ];

  constructor(private router: Router) {}

  // Check if the current route matches the link's href
  isActive(linkHref: string): boolean {
    return this.router.url === linkHref;
  }
}
