import { Module } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { ParcoursController } from './parcours.controller';
import { PaginatorService } from '../common/services/paginator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcours } from './entities/parcours.entity';
import { ParcoursTranslations } from './entities/parcours-translations.entity';
import { ParcoursTheme } from '../parcours-theme/entities/parcours-theme.entity';
import { LocaleService } from '../locale/locale.service';
import { Locale } from '../locale/entities/locale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcours, ParcoursTranslations, ParcoursTheme, Locale])],
  controllers: [ParcoursController],
  providers: [ParcoursService, PaginatorService, LocaleService],
})
export class ParcoursModule {}
