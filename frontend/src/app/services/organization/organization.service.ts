import { Injectable } from '@angular/core';
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  
  private bucketName = environment.aws.s3.bucketName;
  private region = environment.aws.region;
  
  private s3Client = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: environment.aws.s3.accessKey!,
      secretAccessKey: environment.aws.s3.secretKey!,
    },
  })
  
  uploadLogo(organizationName: string, file: File, onProgress: (progress: number) => void) {
    if (organizationName) {
			let logoUrl;
			const sanitizedOrgName = organizationName.replace(/[^a-zA-Z0-9-]/g, '-');
			const key = `${sanitizedOrgName}/company-assets/${file.name}`;
			
			const putObjectCommand = new PutObjectCommand({
				Bucket: this.bucketName,
				Key: key,
				Body: file,
				ContentType: file.type,
			});
			const getObjectCommand = new GetObjectCommand({
				Bucket: this.bucketName,
        Key: key,
        ResponseContentType: file.type,
			})
			
			try {
				
				this.s3Client.send(putObjectCommand).then();
				getSignedUrl(this.s3Client, getObjectCommand, { expiresIn: 3600 }).then((response) => {
					logoUrl = response;
				})
				
				return logoUrl;
			} catch (error) {
				console.error('Error uploading file:', error);
				throw new Error('Upload failed');
			}
    }
		
		throw new Error('Organization name is required');
  }
}
