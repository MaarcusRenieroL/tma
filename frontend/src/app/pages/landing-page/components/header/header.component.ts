import { Component } from "@angular/core";

@Component({
  selector: "landing-page-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  sidebarVisible: boolean = false;

  onMenuClick() {
    this.sidebarVisible = true;
  }
}
