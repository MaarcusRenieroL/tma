import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { toast } from "ngx-sonner";

interface JwtPayload {
	exp: number;
}

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private cookieService: CookieService, private router: Router) {}
	
	canActivate(): boolean {
		const token = this.cookieService.get('syncTeam.token');
		const userId = this.cookieService.get("syncTeam.userId");
		
		if (token && userId) {
			const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
			const currentTime = Date.now() / 1000;
			
			if (decodedToken.exp > currentTime) {
				return true;
			} else {
				this.cookieService.delete('syncTeam.token');
				this.cookieService.delete('syncTeam.userId');
				toast.error("Please login again")
			}
		}
		
		this.router.navigate(['/auth/sign-in']).then();
		return false; // Deny access
	}
}
