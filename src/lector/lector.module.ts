import { Module } from '@nestjs/common';
import { LectorController } from './controllers/lector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lector } from './entities/lector.entity';
import { LectorService } from './services/lector.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lector]), CloudinaryModule],
  controllers: [LectorController],
  providers: [LectorService],
  exports: [LectorService],
})
export class LectorModule {}
