import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-card-content',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
})
export class CardContentComponent {
  @Input() className = '';
  @HostBinding('class') get classes() {
    return `${this.className}`;
  }
}
