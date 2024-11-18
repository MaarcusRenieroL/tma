import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-input',
  template: `<input
              [type]="type"
              [placeholder]="placeholder"
              [disabled]="disabled"
              [ngClass]="classes" />`,
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() className: string = '';
  
  get classes() {
    return `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${this.className}`;
  }
}