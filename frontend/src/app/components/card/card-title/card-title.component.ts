import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card-title',
  template: `<ng-content></ng-content>`,
})
export class CardTitleComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `font-semibold leading-none tracking-tight ${this.className}`;
  }
}
