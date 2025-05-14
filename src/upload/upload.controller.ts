import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './pipes/file-size.validation.pipe';
import { multerOptions } from './multer.options';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() // new FileSizeValidationPipe(),
    //   validators: [new MaxFileSizeValidator({ maxSize: 30 })],
    file // new ParseFilePipe({
    // }),
    // new ParseFilePipeBuilder()
    //   // .addFileTypeValidator({
    //   //   fileType: 'png',
    //   // })
    //   // .addMaxSizeValidator({
    //   //   maxSize: 400,
    //   // })
    //   .build(),
    : Express.Multer.File,
  ) {
    return await this.uploadService.upload(file);
  }
}
