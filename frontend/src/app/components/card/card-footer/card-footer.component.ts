import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-footer',
  template: `<ng-content></ng-content>`,
})
export class CardFooterComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `flex items-center ${this.className}`;
  }
}
