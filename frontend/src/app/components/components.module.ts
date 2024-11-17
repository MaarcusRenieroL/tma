import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "./button/button.component";
import { SheetComponent } from "./sheet/sheet/sheet.component";
import { SheetTriggerComponent } from "./sheet/sheet-trigger/sheet-trigger.component";
import { SheetHeaderComponent } from "./sheet/sheet-header/sheet-header.component";
import { SheetFooterComponent } from "./sheet/sheet-footer/sheet-footer.component";


@NgModule({
  declarations: [ ButtonComponent, SheetComponent, SheetTriggerComponent, SheetHeaderComponent, SheetFooterComponent ],
  exports: [ ButtonComponent, SheetComponent, SheetTriggerComponent, SheetHeaderComponent, SheetFooterComponent ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule {
}
