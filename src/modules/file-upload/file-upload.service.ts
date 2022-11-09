import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { existsSync, mkdir, unlinkSync, writeFile } from 'fs';
import { extname, join } from 'path';
import { MulterFile } from 'src/core/types/file.type';
import { FileModel } from 'src/models/file.model';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import { v4 } from 'uuid';

@Injectable()
export class FileUploadService {

  private readonly destination = './upload';

  constructor(
    @InjectModel(FileModel)
    private fileModel: typeof FileModel,
  ) {}

  public async upload(file: MulterFile): Promise<FileResponseDto> {
    const result = this.createFileResponseDto(file);
    const fileId = v4();
    const savedFile = await this.fileModel.create({ ...result, fileId });
    this.saveFileToStorage(file, savedFile);
    return savedFile;
  }

  public async replace(
    file: MulterFile,
    fileId: string,
  ): Promise<FileResponseDto> {
    const fileWhichNeedUpdate = await this.findFileByFileId(fileId);
    if (!Boolean(fileWhichNeedUpdate)) {
      this.throwExceptionIfFileNotExist(fileId);
    }
    this.deleteFileFromStorage(fileWhichNeedUpdate);
    const newFile = this.createFileResponseDto(file);
    await fileWhichNeedUpdate.update({ ...newFile });
    await fileWhichNeedUpdate.save();
    this.saveFileToStorage(file, fileWhichNeedUpdate);
    return fileWhichNeedUpdate;
  }

  public async delete(fileId: string): Promise<FileResponseDto> {
    const file = await this.findFileByFileId(fileId);
    await this.fileModel.destroy({ where: { fileId } });
    if (!Boolean(file)) {
      this.throwExceptionIfFileNotExist(fileId);
    }
    return this.deleteFileFromStorage(file);
  }

  public async getById(fileId: string): Promise<FileResponseDto> {
    const file = await this.findFileByFileId(fileId);
    if (!file) {
      this.throwExceptionIfFileNotExist(fileId);
    }
    return file;
  }

  private async findFileByFileId(fileId: string): Promise<FileModel> {
    return await this.fileModel.findOne({ where: { fileId } });
  }

  private deleteFileFromStorage(file: FileModel): FileModel {
    try {
      unlinkSync(this.getPathToFile(file));
      return file;
    } catch (e) {
      this.throwExceptionIfFileNotExist(file.fileId);
    }
  }

  private saveFileToStorage(file: MulterFile, fileToSave: FileModel): any {
    const pathToFolder = this.getPathToFilesFolder();
    this.createFolderIfNecessary(pathToFolder);
    writeFile(this.getPathToFile(fileToSave), file.buffer, this.errorCallback);
  }

  private throwExceptionIfFileNotExist(fileId: string): void {
    throw new HttpException(
      `File with id ${fileId} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  private getFileName({ fileExt, fileId }: FileModel): string {
    return `${fileId}${fileExt}`;
  }

  private getPathToFile(file: FileModel): string {
    return join(this.getPathToFilesFolder(), this.getFileName(file));
  }

  private getPathToFilesFolder(): string {
    return join(process.cwd(), this.destination);
  }

  private createFolderIfNecessary(pathToFolder: string): void {
    if (!existsSync(pathToFolder)) {
      mkdir(pathToFolder, { recursive: true }, this.errorCallback);
    }
  }

  private errorCallback(err: NodeJS.ErrnoException): void {
    if (err) throw new HttpException(err.message, HttpStatus.FORBIDDEN);
  }

  private createFileResponseDto(file: MulterFile): FileResponseDto {
    const fileExt = extname(file.originalname);
    return {
      fileExt,
      originalName: file.originalname,
      fileSize: file.size,
    } as FileResponseDto;
  }
}
