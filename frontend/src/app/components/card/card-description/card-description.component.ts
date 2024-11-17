import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-description',
  template: `<ng-content></ng-content>`,
})
export class CardDescriptionComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `text-sm text-muted-foreground ${this.className}`;
  }
}
