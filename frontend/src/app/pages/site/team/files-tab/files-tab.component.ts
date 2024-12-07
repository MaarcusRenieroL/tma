import { Component } from '@angular/core';
import { File } from "../../../../models/file";

@Component({
  selector: 'team-files-tab',
  templateUrl: './files-tab.component.html',
})
export class FilesTabComponent {
  files: File[] = [];
  filteredFiles: File[] = [];
  
  // ["JPEG", "PNG", "JPG", "PDF", "DOCX", "PPT", "XLSX", "CSV"];
  fileTypes = [
    { name: "JPEG" },
    { name: "PNG" },
    { name: "JPG" },
    { name: "PDF" },
    { name: "DOCX" },
    { name: "PPT" },
    { name: "XLSX" },
    { name: "CSV" },
  ];
  searchQuery = '';
  selectedType: string | null = null;
  
  ngOnInit(): void {
    this.files = this.generateFiles(50);
    this.filteredFiles = [...this.files];
  }
  
  generateFiles(count: number): File[] {
    const types: ("JPEG" | "PNG" | "JPG" | "PDF" | "DOCX" | "PPT" | "XLSX" | "CSV")[] = ["JPEG", "PNG", "JPG", "PDF", "DOCX", "PPT", "XLSX", "CSV"];
    const randomSize = () => Math.floor(Math.random() * 5000000) + 100000;
    const randomDate = () => new Date(Date.now() - Math.random() * 31556952000);
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `File ${i + 1}`,
      description: `Description for file ${i + 1}`,
      createdDate: randomDate(),
      updatedDate: randomDate(),
      size: randomSize(),
      type: types[Math.floor(Math.random() * types.length)],
    }));
  }
  
  applyFilters() {
    this.filteredFiles = this.files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = this.selectedType ? file.type === this.selectedType : true;
      return matchesSearch && matchesType;
    });
  }
  
  onSearchInputChange(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }
  
  onTypeSelect(type: string | null) {
    this.selectedType = type;
    this.applyFilters();
  }
  
  clearFilters() {
    this.searchQuery = '';
    this.selectedType = null;
    this.filteredFiles = [...this.files];
  }
}
