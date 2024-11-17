import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-sheet-trigger',
  templateUrl: './sheet-trigger.component.html',
})
export class SheetTriggerComponent {
  @Output() open = new EventEmitter<void>();
}
