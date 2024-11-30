import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-team-modal',
  templateUrl: './add-team-modal.component.html',
})
export class AddTeamModalComponent {
  teamForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamDescription: ['', Validators.required],
    });
  }
  
  submitForm() {
    if (this.teamForm.valid) {
      const formData = this.teamForm.value;
      console.log(formData); // Handle form submission logic
    }
  }
}
