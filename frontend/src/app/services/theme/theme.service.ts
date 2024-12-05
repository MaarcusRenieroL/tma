import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	
	constructor(private cookieService: CookieService) {}
	
	setTheme(theme: string) {
		// Save the theme preference to a cookie
		this.cookieService.set('syncTeam.theme', theme);
		
		// Apply the theme to the body
		if (theme === 'dark') {
			document.body.classList.add('dark');
		} else if (theme === 'light') {
			document.body.classList.remove('dark');
		} else if (theme === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			// @typescript-eslint/no-unused-expressions
			prefersDark ? document.body.classList.add('dark') : document.body.classList.remove('dark');
		}
		
		console.log(`Theme set to: ${theme}`);
	}
	
	toggleDarkMode() {
		const currentTheme = this.cookieService.get('syncTeam.theme') || 'system';
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		this.setTheme(newTheme);
	}
}
