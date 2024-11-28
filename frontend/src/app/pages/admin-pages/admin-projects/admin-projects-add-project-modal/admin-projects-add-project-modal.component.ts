import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-projects-add-project-modal',
  templateUrl: './admin-projects-add-project-modal.component.html',
  styleUrl: './admin-projects-add-project-modal.component.css'
})
export class AdminProjectsAddProjectModalComponent {
  @Input() categories!: { name: string, value: string }[];
  
  selectedCategory!: string;
  
  get selectedCategoryName(): string {
    return this.categories.find(category => category.value === this.selectedCategory)?.name || 'Category: All';
  }
  
  setCategory(category: string) {
    this.selectedCategory = category;
  }
}
