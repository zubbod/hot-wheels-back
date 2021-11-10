import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from 'src/models/file.model';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  resolve,
} from 'path';

@Module({
  providers: [FileUploadService],
  controllers: [FileUploadController],
  imports: [
    MulterModule.register({
      dest: './upload',
      preservePath: true,

    }),
    SequelizeModule.forFeature([
      FileModel,
    ]),
  ],
})
export class FileUploadModule {}
