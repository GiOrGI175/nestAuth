import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const path = Math.random().toString().slice(2);

    const type = file.mimetype.split('/')[1];
    const filePath = `images/${path}`;

    return this.appService.uploadFile(filePath, file);
  }

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('file'))
  uploadMany(@UploadedFiles() files: Express.Multer.File) {
    return this.appService.uploadFiles(files);
  }

  @Post('getFile')
  getFileById(@Body('fileId') fileId) {
    return this.appService.getFile(fileId);
  }

  @Post('deleteFile')
  deleteFileById(@Body('fileId') fileId) {
    return this.appService.deleteFileById(fileId);
  }
}
