import { Component, Input } from '@angular/core';

@Component({
  selector: 'add-project-modal',
  templateUrl: './add-project-modal.component.html',
})
export class AddProjectModalComponent {
  @Input() categories!: { name: string, value: string }[];
  
  selectedCategory!: string;
  
  get selectedCategoryName(): string {
    return this.categories.find(category => category.value === this.selectedCategory)?.name || 'Category: All';
  }
  
  setCategory(category: string) {
    this.selectedCategory = category;
  }
}
