import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-sheet',
  templateUrl: './sheet.component.html',
})
export class SheetComponent {
  @Input() isOpen = false;
  @Input() side: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Output() close = new EventEmitter<void>();

  closeSheet() {
    this.close.emit();
  }

  getSheetClasses(): string {
    const baseClasses =
      'fixed bg-white z-50 p-6 shadow-lg transition-transform duration-500';
    switch (this.side) {
      case 'top':
        return `${baseClasses} inset-x-0 top-0 border-b transform ${
          this.isOpen ? 'translate-y-0' : '-translate-y-full'
        }`;
      case 'bottom':
        return `${baseClasses} inset-x-0 bottom-0 border-t transform ${
          this.isOpen ? 'translate-y-0' : 'translate-y-full'
        }`;
      case 'left':
        return `${baseClasses} inset-y-0 left-0 w-3/4 sm:max-w-sm border-r transform ${
          this.isOpen ? 'translate-x-0' : '-translate-x-full'
        }`;
      case 'right':
      default:
        return `${baseClasses} inset-y-0 right-0 w-3/4 sm:max-w-sm border-l transform ${
          this.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;
    }
  }
}
