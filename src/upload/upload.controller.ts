import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Body,
  Query,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { CreateUploadDto, GetImageDto } from './dto/create-upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() createDto: CreateUploadDto,
  ) {
    return await this.uploadService.upload(file);
  }
  @ApiQuery({ name: 'url', type: 'string' })
  @Get('image')
  async getImage(@Query() query: any) {
    return await this.uploadService.getImg(query.url);
  }
}
