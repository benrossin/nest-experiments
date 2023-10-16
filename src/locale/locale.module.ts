import { Module } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { LocaleController } from './locale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locale } from './entities/locale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locale])],
  controllers: [LocaleController],
  providers: [LocaleService],
})
export class LocaleModule {}
