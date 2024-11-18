import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "./button/button.component";
import { SheetComponent } from "./sheet/sheet/sheet.component";
import { SheetTriggerComponent } from "./sheet/sheet-trigger/sheet-trigger.component";
import { SheetHeaderComponent } from "./sheet/sheet-header/sheet-header.component";
import { SheetFooterComponent } from "./sheet/sheet-footer/sheet-footer.component";
import { CardComponent } from "./card/card/card.component";
import { CardHeaderComponent } from "./card/card-header/card-header.component";
import { CardTitleComponent } from "./card/card-title/card-title.component";
import { CardDescriptionComponent } from "./card/card-description/card-description.component";
import { CardContentComponent } from "./card/card-content/card-content.component";
import { CardFooterComponent } from "./card/card-footer/card-footer.component";


@NgModule({
	declarations: [ ButtonComponent, SheetComponent, SheetTriggerComponent, SheetHeaderComponent, SheetFooterComponent, CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent ],
	exports: [ ButtonComponent, SheetComponent, SheetTriggerComponent, SheetHeaderComponent, SheetFooterComponent, CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent ],
	imports: [ CommonModule ]
})
export class ComponentsModule {
}
