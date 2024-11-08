import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
  ],
})
export class AuthModule {}
