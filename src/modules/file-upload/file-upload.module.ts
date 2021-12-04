import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from 'src/models/file.model';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [FileUploadService],
  controllers: [FileUploadController],
  imports: [
    MulterModule.register(),
    SequelizeModule.forFeature([
      FileModel,
    ]),
    AuthModule,
  ],
})
export class FileUploadModule {}
