import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'src/core/types/file.type';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import { FileUploadService } from 'src/modules/file-upload/file-upload.service';

@Controller('file')
export class FileUploadController {

  constructor(
    private fileService: FileUploadService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: MulterFile): Promise<FileResponseDto> {
    return await this.fileService.createFile(file);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    console.log(id);
  }

  @Patch('replace/:id')
  @UseInterceptors(FileInterceptor('file'))
  public replace(
    @UploadedFile() file: MulterFile,
    @Param('id') id: string,
  ) {
    console.log(file, id);
  }

  @Get('find/:id')
  public getById(@Param('id') id: string) {
    console.log(id);
  }
}
