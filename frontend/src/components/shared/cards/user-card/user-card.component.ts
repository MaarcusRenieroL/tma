import { Component, Input } from '@angular/core';
import { User } from "../../../../app/models/user";

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() user!: User;
  
  getInitials(name: string) {
    return name.split(" ").map(word => word[0]).join(" ");
  }
}
