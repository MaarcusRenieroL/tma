import { NgModule } from "@angular/core";
import { hlmBtnDirective } from "./lib/hlm-button.directive";

export * from "./lib/hlm-button.directive";

@NgModule({
  imports: [hlmBtnDirective],
  exports: [hlmBtnDirective],
})
export class hlmBtnModule {}
