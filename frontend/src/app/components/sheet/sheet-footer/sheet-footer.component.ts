import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-sheet-footer',
  templateUrl: './sheet-footer.component.html',
})
export class SheetFooterComponent {
  @Input() extraClasses: string | string[] = '';

  get sheetFooterClasses(): string[] {
    const extraClassesArray = Array.isArray(this.extraClasses) ? this.extraClasses : this.extraClasses.split(' ');

    return [
      ...extraClassesArray,
    ];
  }
}
