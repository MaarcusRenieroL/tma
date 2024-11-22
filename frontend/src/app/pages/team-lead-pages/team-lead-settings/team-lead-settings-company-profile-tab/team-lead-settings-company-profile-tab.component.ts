import { Component } from '@angular/core';
import { toast } from "ngx-sonner";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'team-lead-settings-company-profile-tab',
  templateUrl: './team-lead-settings-company-profile-tab.component.html',
})
export class TeamLeadSettingsCompanyProfileTabComponent {
  file: File | null = null;
  preview: string | null = null;
  uploadProgress = 0;
  maxSize = 5 * 1024 * 1024; // 5MB
  acceptedFileTypes = ['image/*'];
  
  constructor(private sanitizer: DomSanitizer) {
  
  }
  
  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        toast('Invalid File Type', {
          description: 'Please select an image file.',
        });
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast('File Too Large', {
          description: 'The selected file exceeds the maximum size of 5MB.',
        });
        return;
      }
      
      this.file = selectedFile;
      this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(selectedFile)) as string;
      
      this.uploadFile(selectedFile);
    }
  }
  
  uploadFile(file: File): void {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful upload
        toast('Upload Successful', {
          description: `${file.name} has been uploaded successfully.`,
        });
      }
    }, 200);
  }
  
  removeFile(): void {
    this.file = null;
    this.preview = null;
    this.uploadProgress = 0;
  }
  
}
