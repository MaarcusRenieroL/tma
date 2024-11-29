import { Component } from '@angular/core';
import { AuthService } from "../../../../app/services/auth/auth.service";
import { toast } from "ngx-sonner";
import { Router } from "@angular/router";

@Component({
	selector: 'admin-account-nav', templateUrl: './account-nav.component.html',
})
export class AccountNavComponent {
	constructor(private authService: AuthService, private router: Router) {
	}
	
	logout() {
		this.authService.logout();
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.router.navigate([ this.router.url ]).then();
		});
		toast.success("Successfully logged out")
	}
}
