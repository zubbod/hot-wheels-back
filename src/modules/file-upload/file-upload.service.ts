import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MulterFile } from 'src/core/types/file.type';
import { FileUpload } from 'src/core/utils/file-upload';
import { FileModel } from 'src/models/file.model';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(FileModel)
    private fileModel: typeof FileModel,
  ) {}

  public async upload(file: MulterFile): Promise<FileResponseDto> {
    const result = FileUpload.createFileResponseDto(file);
    const savedFile = await this.fileModel.create(result);
    return savedFile;
  }

  public async delete(fileId: string): Promise<FileResponseDto> {
    const file = await this.fileModel.findOne({ where: { fileId } });
    const fail = () => {
      throw new HttpException(
        `File with id ${fileId} not found`,
        HttpStatus.NOT_FOUND,
      );
    };
    if (file) {
      try {
        fs.unlinkSync(this.getPathToFile(file));
        return file;
      } catch (e) {
        fail();
      }
    } else {
      fail();
    }
  }

  private getFileName({ fileExt, fileId }: FileModel): string {
    return `${fileId}${fileExt}`;
  }

  private getPathToFile(file: FileModel): string {
    return join(process.cwd(), FileUpload.destination, this.getFileName(file));
  }
}
