import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ParseUUIDPipe } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { CreateParcourDto } from './dto/create-parcour.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UpdateParcourDto } from './dto/update-parcour.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Parcours } from './entities/parcours.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { SwaggerCreate, SwaggerDelete, SwaggerFindAll, SwaggerFindOne, SwaggerUpdate } from './decorators/swagger.decorator';
import { CheckAbilities } from '../ability/decorators/abilities.decorator';
import { Action } from '../ability/enums/actions.enum';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Parcours')
@Controller('parcours')
export class ParcoursController {
  constructor(private parcoursService: ParcoursService) {}

  @Get(':id')
  @SwaggerFindOne()
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Parcours> {
    return await this.parcoursService.findOne(id);
  }

  @Get()
  @SwaggerFindAll()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<PaginationDto<Parcours>> {
    return this.parcoursService.findAll(paginationQueryDto);
  }

  @Post()
  @Auth()
  @CheckAbilities({ action: Action.Create, subject: Parcours })
  @SwaggerCreate()
  async create(@CurrentUser() user: User, @Body() createParcourDto: CreateParcourDto): Promise<Parcours> {
    return this.parcoursService.create(user, createParcourDto);
  }

  @Patch(':id')
  @Auth()
  @CheckAbilities({ action: Action.Update, subject: Parcours })
  @SwaggerUpdate()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateParcourDto: UpdateParcourDto): Promise<Parcours> {
    return this.parcoursService.update(id, updateParcourDto);
  }

  @Delete(':id')
  @Auth()
  @CheckAbilities({ action: Action.Delete, subject: Parcours })
  @SwaggerDelete()
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<DeleteResult> {
    return this.parcoursService.remove(id);
  }
}
