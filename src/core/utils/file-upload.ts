import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterFile } from 'src/core/types/file.type';
import { FileResponseDto } from 'src/modules/file-upload/dto/file-response.dto';
import * as uuid from 'uuid';

export class FileUpload {
  public static destination = './upload';

  public static createFileResponseDto(file: MulterFile): FileResponseDto {
    const fileId = file.filename.split('.')[0];
    const fileExt = extname(file.originalname);
    return {
      fileId,
      fileExt,
      originalName: file.originalname,
      fileSize: file.size,
    } as FileResponseDto;
  }

  public static generateFileName(file: MulterFile): string {
    const ext = extname(file.originalname);
    return `${uuid.v4()}${ext}`;
  }

  public static storage = diskStorage({
    destination: FileUpload.destination,
    filename: (req, file, callback) => {
      callback(null, FileUpload.generateFileName(file));
    },
  });
}
