import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'ngx-sonner';
import { OrganizationService } from '../../../services/organization/organization.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'onboarding',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  organizationForm: FormGroup;
  uploading = false;
  logoUrl: string = '';
  file: File | null = null;
  preview: string | null = null;
  uploadProgress = 0;
  maxSize = 5 * 1024 * 1024; // 5MB
  acceptedFileTypes = ['image/*'];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private organizationService: OrganizationService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.organizationForm = this.fb.group({
      organizationName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      logoUrl: [''],
    });
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      this.organizationService
        .createOrganization({
          organization: this.organizationForm.value,
          userId: this.cookieService.get('syncTeam.userId'),
        })
        .subscribe((response) => {
          if (response) {
            if (response.statusCode === 201) {
              toast.success(response.message);
              this.cookieService.set('syncTeam.isOnboarded', 'true');
              this.router.navigate(['/dashboard']).then();
            } else if (
              [401, 402, 403, 404, 405, 500].includes(response.statusCode)
            ) {
              toast.error(response.message);
            }
          } else {
            toast.error('Something went wrong');
          }
        });
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
      this.preview = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(selectedFile)
      ) as string;

      this.uploadFile(selectedFile);
    }
  }

  async uploadFile(file: File): Promise<void> {
    if (!this.organizationForm.get('organizationName')?.value) {
      toast.error('Upload Failed', {
        description: 'Organization name is required.',
      });
      return;
    }

    this.file = file;
    try {
      this.uploading = true;
      const organizationName =
        this.organizationForm.get('organizationName')!.value;

      this.logoUrl = await this.organizationService.uploadLogo(
        organizationName,
        this.file
      );

      // Update the form group with the logo URL
      this.organizationForm.patchValue({ logoUrl: this.logoUrl });

      console.log('Logo URL:', this.logoUrl);
      console.log('Form Group Value:', this.organizationForm.value);

      toast.success('Upload Successful', {
        description: 'The logo has been uploaded successfully.',
      });
    } catch (error) {
      console.error(error);
      toast.error('Upload Failed', {
        description:
          'There was an issue uploading your file. Please try again.',
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
