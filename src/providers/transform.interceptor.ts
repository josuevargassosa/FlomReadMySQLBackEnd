

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  success: boolean;
  result: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((result) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: context.switchToHttp().getResponse().statusCode == 401 ? "No autorizado" : context.switchToHttp().getResponse().statusCode == 200 ? "La solicitud ha tenido éxito" : context.switchToHttp().getResponse().statusCode == 201 ? "La solicitud ha tenido éxito" : context.switchToHttp().getResponse().statusCode == 202 ? "La solicitud ha tenido éxito" : context.switchToHttp().getResponse().statusCode == 400 ? "El servidor no pudo interpretar la solicitud dada una sintaxis inválida" : context.switchToHttp().getResponse().statusCode == 404 ? "El servidor no pudo encontrar el contenido solicitado. " : context.switchToHttp().getResponse().statusCode == 403 ? "El cliente no posee los permisos necesarios para cierto contenido. " : "El servidor ha encontrado una situación que no sabe cómo manejarla.",
          result,
          success: context.switchToHttp().getResponse().statusCode == 200 || context.switchToHttp().getResponse().statusCode == 202 || context.switchToHttp().getResponse().statusCode == 201 ? true : false
        })
        ),
      );
  }
}


