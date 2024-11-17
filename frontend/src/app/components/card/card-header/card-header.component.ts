import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-header',
  template: `<ng-content></ng-content>`,
})
export class CardHeaderComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `flex flex-col space-y-1.5 ${this.className}`;
  }
}
