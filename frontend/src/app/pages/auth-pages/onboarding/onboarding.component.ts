import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { toast } from "ngx-sonner";
import { OrganizationService } from "../../../services/organization/organization.service";

@Component({
	selector: 'onboarding', templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
	organizationForm: FormGroup;
	uploading = false;
	logoUrl: string = '';
	file: File | null = null;
	preview: string | null = null;
	uploadProgress = 0;
	maxSize = 5 * 1024 * 1024; // 5MB
	acceptedFileTypes = [ 'image/*' ];
	
	
	constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private organizationService: OrganizationService) {
		this.organizationForm = this.fb.group({
			organizationName: [ '', Validators.required ],
			email: [ '', [ Validators.required, Validators.email ] ],
			website: [ '', Validators.required ],
			phoneNumber: [ '', Validators.required ],
			address: [ '', Validators.required ],
			logoUrl: [ '' ]
		});
	}
	
	onSubmit(): void {
		if (this.organizationForm.valid) {
			const formData = this.organizationForm.value;
			console.log('Organization Data:', formData);
		}
	}
	
	onFileSelected(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			console.log('Selected file:', file.name);
			// Handle file upload logic here
		}
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
		this.file = file;
		try {
			this.uploading = true;
			this.logoUrl = this.organizationService.uploadLogo(this.organizationForm.get("organizationName")!.value, this.file, (progress) => {
				this.uploadProgress = progress;
			});
			
			console.log(this.logoUrl)
			
			this.organizationForm.patchValue({ logoUrl: this.logoUrl });
			toast.success('Upload Successful', {
				description: 'The logo has been uploaded successfully.',
			});
		} catch (error) {
			toast.error('Upload Failed', {
				description: 'There was an issue uploading your file. Please try again.',
			});
		} finally {
			this.uploading = false;
		}
	}
	
	removeFile(): void {
		this.file = null;
		this.preview = null;
		this.uploadProgress = 0;
	}
}
