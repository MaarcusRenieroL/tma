import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
})
export class AddProjectModalComponent {
  @Input() categories!: { name: string, value: string }[];
  
  projectForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectCategory: [[], Validators.required],
    });
  }
  
  get selectedCategoryName(): string {
    const selectedCategory = this.projectForm.value.projectCategory;
    return this.categories.find(category => category.value === selectedCategory)?.name || 'Category: All';
  }
  
  setCategory(category: string) {
    this.projectForm.patchValue({ projectCategory: category });
  }
  
  submitForm() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      console.log(formData); // Submit logic
    }
  }
}
