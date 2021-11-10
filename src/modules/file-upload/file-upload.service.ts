import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MulterFile } from 'src/core/types/file.type';
import { FileUpload } from 'src/core/utils/file-upload';
import { FileModel } from 'src/models/file.model';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';

@Injectable()
export class FileUploadService {

  constructor(
    @InjectModel(FileModel)
    private fileModel: typeof FileModel,
  ) {
  }

  public async createFile(file: MulterFile): Promise<FileResponseDto> {
    const result = FileUpload.createFileResponseDto(file);
    const savedFile = await this.fileModel.create(result);
    return savedFile;
  }
}
