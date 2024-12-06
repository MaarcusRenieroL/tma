import { Injectable } from '@angular/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { environment } from '../../../environments/environment.development';
import { CreateOrganizationRequest } from '../../payload/requests/organization/create-organization-request';
import { Observable } from 'rxjs';
import { StandardResponse } from '../../payload/responses/standard-response';
import { Organization } from '../../models/organization';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private bucketName = environment.aws.s3.bucketName ?? '';
  private region = environment.aws.region ?? '';

  private s3Client = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: environment.aws.s3.accessKey! ?? '',
      secretAccessKey: environment.aws.s3.secretKey! ?? '',
    },
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  async uploadLogo(organizationName: string, file: File): Promise<string> {
    if (!organizationName) {
      throw new Error('Organization name is required');
    }

    const sanitizedOrgName = organizationName.replace(/[^a-zA-Z0-9-]/g, '-');
    const key = `${sanitizedOrgName}/company-assets/${file.name}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
    });

    try {
      await this.s3Client.send(putObjectCommand); // Ensure upload completes
      return key;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Upload failed');
    }
  }

  createOrganization(
    createOrganizationRequest: CreateOrganizationRequest
  ): Observable<StandardResponse<Organization>> {
    return this.http.post<StandardResponse<Organization>>(
      environment.backendAPI + 'organizations',
      createOrganizationRequest,
      {
        headers: {
          Authorization: 'Bearer ' + this.cookieService.get('syncTeam.token'),
        },
      }
    );
  }
}
