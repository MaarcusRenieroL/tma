import { Component, OnInit, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Task Manager';
  
  constructor(private cookieService: CookieService, private renderer: Renderer2) {}
  
  ngOnInit() {
    this.setThemeFromCookie();
  }
  
  setThemeFromCookie() {
    const theme = this.cookieService.get('syncTeam.theme') || 'system';
    if (theme === 'dark') {
      this.applyDarkMode();
    } else if (theme === 'light') {
      this.applyLightMode();
    } else {
      // Handle system preference if it's 'system'
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.applyDarkMode();
      } else {
        this.applyLightMode();
      }
    }
  }
  
  applyDarkMode() {
    this.renderer.addClass(document.body, 'dark');
    this.cookieService.set('syncTeam.theme', 'dark');
  }
  
  applyLightMode() {
    this.renderer.removeClass(document.body, 'dark');
    this.cookieService.set('syncTeam.theme', 'light');
  }
}
