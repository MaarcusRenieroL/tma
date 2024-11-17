import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-card',
  template: `<ng-content></ng-content>`,
})
export class CardComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-5 ${this.className}`;
  }
}
