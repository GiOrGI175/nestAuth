import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './upload/aws-s3.service';

@Injectable()
export class AppService {
  constructor(private s3Service: AwsS3Service) {}

  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(filePath, file) {
    return this.s3Service.uploadFile(filePath, file);
  }
}
