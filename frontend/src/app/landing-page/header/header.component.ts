import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "landing-page-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;
  ngOnInit() {
    this.items = [
      {
        label: "Update",
        icon: "pi pi-refresh",
      },
      {
        label: "Delete",
        icon: "pi pi-times",
      },
    ];
  }
}
