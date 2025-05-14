import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload) private uploadModel: typeof Upload) {}
  async upload(file: Express.Multer.File) {
    try {
      console.log(file);
      const image = await this.uploadModel.create({
        fileName: file.fieldname,
        fileType: file.mimetype,
        url: file.path,
      });
      return image;
    } catch (error) {
      if (error instanceof Error && 'getStatus' in error) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error!');
    }
  }
}
