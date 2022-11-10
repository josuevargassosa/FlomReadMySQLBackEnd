import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { Lector } from './lector/entities/lector.entity';
import { enviroments } from './enviroments';
import { LectorModule } from './lector/lector.module';
import { LibroModule } from './libro/libro.module';
import { AuthModule } from './auth/auth.module';
import { ComentarioModule } from './comentario/resumen.module';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { LibroLectorModule } from './libro-lector/libro-lector.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    LectorModule,
    LibroModule,
    ComentarioModule,
    EstadisticaModule,
    LibroLectorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
