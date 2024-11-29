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
export class NoAuthGuard implements CanActivate {
	constructor(private cookieService: CookieService, private router: Router) {}
	
	canActivate(): boolean {
		const token = this.cookieService.get('syncTeam.token');
		
		if (token) {
			const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
			const currentTime = Date.now() / 1000;
			
			if (decodedToken.exp > currentTime) {
				this.router.navigate(['/dashboard']).then();
				toast.info("You are already logged in")
				return false;
			}
		}
		
		return true;
	}
}
