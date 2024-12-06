import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {
  }
  
  ngOnInit() {
    const isOnboarded = this.cookieService.get("syncTeam.isOnboarded");
    
    if (isOnboarded && isOnboarded === "false") {
      this.router.navigate(['auth/onboarding']);
    }
  }
}
