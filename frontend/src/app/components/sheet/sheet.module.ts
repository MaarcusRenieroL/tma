import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetComponent } from './sheet/sheet.component';
import { SheetTriggerComponent } from './sheet-trigger/sheet-trigger.component';
import { SheetHeaderComponent } from './sheet-header/sheet-header.component';
import { SheetFooterComponent } from './sheet-footer/sheet-footer.component';
import { NgpButton } from "ng-primitives/button";



@NgModule({
  declarations: [
    SheetComponent,
    SheetTriggerComponent,
    SheetHeaderComponent,
    SheetFooterComponent
  ],
  exports: [
    SheetTriggerComponent,
    SheetComponent,
    SheetHeaderComponent,
    SheetFooterComponent
  ],
  imports: [
    CommonModule,
    NgpButton
  ]
})
export class SheetModule { }
