import { MulterFile } from 'src/core/types/file.type';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';

export class FileUpload {
  public static createFileResponseDto(file: MulterFile): FileResponseDto {
    return {
      fileId: file.filename,
      originalName: file.originalname,
      fileSize: file.size,
    } as FileResponseDto;
  }
}
