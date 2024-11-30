import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'auth-password-reset',
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) {
  }
  
  resetPasswordToken!: string;
  
  ngOnInit(): void {
    this.resetPasswordToken = this.route.snapshot.queryParamMap.get("token")!;
  }
  
  onSubmit() {
    console.log(this.resetPasswordToken)
  }

}
