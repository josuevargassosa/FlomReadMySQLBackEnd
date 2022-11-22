import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLD_CLOUD_NAME,
      api_key: process.env.CLD_API_KEY,
      api_secret: process.env.api_secret,
    });
  }

  async upload(
    tipoFoto: string,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    switch (tipoFoto) {
      case 'libro':
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            {
              folder: 'libros/',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          toStream(file.buffer).pipe(upload);
        });
        break;

      case 'lector':
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream(
            {
              folder: 'lectores/',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          toStream(file.buffer).pipe(upload);
        });

      default:
        break;
    }
  }
}
