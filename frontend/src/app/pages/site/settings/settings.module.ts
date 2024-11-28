import { NgModule } from "@angular/core";
import { AppearanceTabComponent } from "./appearance-tab/appearance-tab.component";
import { CompanyProfileTabComponent } from "./company-profile-tab/company-profile-tab.component";
import { NotificationsTabComponent } from "./notifications-tab/notifications-tab.component";
import { PasswordTabComponent } from "./password-tab/password-tab.component";
import { ProfileTabComponent } from "./profile-tab/profile-tab.component";
import { TeamTabComponent } from "./team-tab/team-tab.component";
import { CommonModule } from "@angular/common";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
import { HlmInputModule } from "@spartan-ng/ui-input-helm";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmTabsModule } from "@spartan-ng/ui-tabs-helm";
import { BrnTabsModule } from "@spartan-ng/ui-tabs-brain";
import { HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { BrnSelectModule } from "@spartan-ng/ui-select-brain";
import { HlmLabelModule } from "@spartan-ng/ui-label-helm";
import { BrnLabelModule } from "@spartan-ng/ui-label-brain";
import { HlmCheckboxModule } from "@spartan-ng/ui-checkbox-helm";
import { BrnCheckboxModule } from "@spartan-ng/ui-checkbox-brain";
import { FormsModule } from "@angular/forms";
import { HlmCardModule } from "@spartan-ng/ui-card-helm";
import { HlmBadgeModule } from "@spartan-ng/ui-badge-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { BrnMenuModule } from "@spartan-ng/ui-menu-brain";
import { NgIconsModule } from "@ng-icons/core";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { BrnTableModule } from "@spartan-ng/ui-table-brain";
import { SettingsComponent } from "./settings.component";
import { SharedModule } from "../../../../components/shared/shared.module";

const components = [
	AppearanceTabComponent,
	CompanyProfileTabComponent,
	NotificationsTabComponent,
	PasswordTabComponent,
	ProfileTabComponent,
	TeamTabComponent,
	SettingsComponent
]

@NgModule({
	declarations: [...components],
	imports: [
		CommonModule,
		FormsModule,
		
		HlmToasterComponent,
		
		HlmInputModule,
		
		HlmButtonDirective,
		
		HlmTabsModule,
		BrnTabsModule,
		
		HlmSelectModule,
		BrnSelectModule,
		
		HlmLabelModule,
		BrnLabelModule,
		
		HlmCheckboxModule,
		BrnCheckboxModule,
		
		HlmCardModule,
		
		HlmBadgeModule,
		
		HlmMenuModule,
		BrnMenuModule,
		
		HlmSelectModule,
		BrnSelectModule,
		
		NgIconsModule,
		
		HlmTableModule,
		BrnTableModule,
		SharedModule
	],
	exports: [...components]
})
export class SettingsModule {}