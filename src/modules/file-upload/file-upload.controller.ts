import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'src/core/types/file.type';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import { FileUploadService } from 'src/modules/file-upload/file-upload.service';

@Controller('file')
export class FileUploadController {
  constructor(private fileService: FileUploadService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', { storage: FileUpload.storage }))
  // public async upload(
  //   @UploadedFile() file: MulterFile,
  // ): Promise<FileResponseDto> {
  //   return await this.fileService.upload(file);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @UploadedFile() file: MulterFile,
  ): Promise<FileResponseDto> {
    return await this.fileService.upload(file);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: string): Promise<FileResponseDto> {
    return await this.fileService.delete(id);
  }

  @Post('replace/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async replace(
    @UploadedFile() file: MulterFile,
    @Param('id') id: string,
  ): Promise<FileResponseDto> {
    return await this.fileService.replace(file, id);
  }

  @Get('find/:id')
  public getById(@Param('id') id: string) {
    console.log(id);
  }
}
