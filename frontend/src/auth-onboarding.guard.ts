import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class AuthOnboardingGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}
  
  canActivate(): boolean {
    const isOnboarded = this.cookieService.get('syncTeam.isOnboarded');
    const token = this.cookieService.get('syncTeam.token');
    
    if (token) {
      if (isOnboarded === 'true') {
        this.router.navigate(['/dashboard']).then();
        return false;
      } else if (isOnboarded === 'false') {
        return true;
      }
    }
    
    // No token or invalid state, redirect to sign-in
    toast.error('Please sign in first');
    this.router.navigate(['/auth/sign-in']).then();
    return false;
  }
}
