import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Upload } from './entities/upload.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from './multer.options';

@Module({
  imports: [
    SequelizeModule.forFeature([Upload]),
    MulterModule.register({ ...multerConfig, ...multerOptions }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
