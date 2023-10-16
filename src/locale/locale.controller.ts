import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { Locale } from './entities/locale.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Auth } from '../auth/decorators/auth.decorator';
import { SwaggerCreate, SwaggerDelete, SwaggerFindAll, SwaggerFindOne, SwaggerUpdate } from './decorators/swagger.decorator';

@ApiTags('Locale')
@Controller('locale')
export class LocaleController {
  constructor(private readonly localeService: LocaleService) {}

  @Get(':id')
  @SwaggerFindOne()
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Locale> {
    return this.localeService.findOne(id);
  }

  @Get()
  @SwaggerFindAll()
  async findAll(): Promise<Locale[]> {
    return this.localeService.findAll();
  }

  @Post()
  @Auth()
  @SwaggerCreate()
  async create(@Body() createLocaleDto: CreateLocaleDto): Promise<Locale> {
    return this.localeService.create(createLocaleDto);
  }

  @Patch(':id')
  @Auth()
  @SwaggerUpdate()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateLocaleDto: UpdateLocaleDto): Promise<UpdateResult> {
    return this.localeService.update(id, updateLocaleDto);
  }

  @Delete(':id')
  @Auth()
  @SwaggerDelete()
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<DeleteResult> {
    return this.localeService.remove(id);
  }
}
