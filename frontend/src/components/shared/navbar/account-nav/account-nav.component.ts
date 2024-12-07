import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../app/services/auth/auth.service";
import { toast } from "ngx-sonner";
import { Router } from "@angular/router";
import { UserService } from "../../../../app/services/user/user.service";
import { CookieService } from "ngx-cookie-service";
import { ThemeService } from "../../../../app/services/theme/theme.service";

@Component({
	selector: 'admin-account-nav',
	templateUrl: './account-nav.component.html',
})
export class AccountNavComponent implements OnInit {
	
	name!: string;
	email!: string;
	
	constructor(
		private authService: AuthService,
		private router: Router,
		private userService: UserService,
		private cookieService: CookieService,
		protected themeService: ThemeService
	) {}
	
	ngOnInit() {
		this.userService.getUserByUserId(this.cookieService.get("syncTeam.userId"))
			.subscribe((response) => {
				if (response?.statusCode === 200) {
					this.name = response.data.name;
					this.email = response.data.email;
				}
			});
	}
	
	logout() {
		this.authService.logout();
		
		this.router.navigate(["/"]).then();
		toast.success("Successfully logged out");
	}
}
