import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsS3Service {
  private storageService;
  private bucketName;

  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.storageService = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCES_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }
  async uploadFile(filePath: string, file) {
    if (!filePath) return;

    const config = {
      Key: filePath,
      Bucket: this.bucketName,
      File: file,
    };

    const command = new PutObjectCommand(config);
    await this.storageService.send(command);

    return filePath;
  }
}
