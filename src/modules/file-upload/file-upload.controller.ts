import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RoleEnum } from 'src/core/enum/role.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { MulterFile } from 'src/core/types/file.type';
import { FileModel } from 'src/models/file.model';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import { FileUploadService } from 'src/modules/file-upload/file-upload.service';

@ApiTags('File upload')
@Controller('file')
export class FileUploadController {
  constructor(private fileService: FileUploadService) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({ status: 201, type: FileModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(
    @UploadedFile() file: MulterFile,
  ): Promise<FileResponseDto> {
    return await this.fileService.upload(file);
  }

  @ApiOperation({ summary: 'Delete file' })
  @ApiResponse({ status: 200, type: FileModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({
    name: 'file id',
    example: 'c42a5282-df86-4071-93f3-494773ab4308',
    required: true,
  })
  @Delete('delete/:id')
  public async delete(@Param('id') id: string): Promise<FileResponseDto> {
    return await this.fileService.delete(id);
  }

  @ApiOperation({ summary: 'Replace file by fileId' })
  @ApiResponse({ status: 200, type: FileModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({
    name: 'file id',
    example: 'c42a5282-df86-4071-93f3-494773ab4308',
    required: true,
  })
  @Post('replace/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async replace(
    @UploadedFile() file: MulterFile,
    @Param('id') id: string,
  ): Promise<FileResponseDto> {
    return await this.fileService.replace(file, id);
  }

  @ApiOperation({ summary: 'Find file' })
  @ApiResponse({ status: 200, type: FileModel })
  @Roles(RoleEnum.User, RoleEnum.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiParam({
    name: 'file id',
    example: 'c42a5282-df86-4071-93f3-494773ab4308',
    required: true,
  })
  @Get('find/:id')
  public getById(@Param('id') id: string): Promise<FileResponseDto> {
    return this.fileService.getById(id);
  }
}
