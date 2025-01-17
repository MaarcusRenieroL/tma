import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService) {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.cookieService.get('syncTeam.token');
		
		if (token) {
			const clonedRequest = req.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
			
			return next.handle(clonedRequest);
		}
		
		return next.handle(req);
	}
}
