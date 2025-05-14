import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Upload } from './entities/upload.entity';
import { GetImageDto } from './dto/create-upload.dto';

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
  async getImg(url: string) {
    try {
      const image = await this.uploadModel.findOne({
        where: { url: `uploads\\` + url },
      });
      if (!image) throw new NotFoundException('Image not found!');
      return image;
    } catch (error) {
      if (error instanceof Error && 'getStatus' in error) {
        throw error;
      }
      throw new InternalServerErrorException('Internal server error!');
    }
  }
}
