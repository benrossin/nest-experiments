import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerFindAll } from './decorators/swagger.decorator';
import { UnitService } from './unit.service';
import { Unit } from './entities/unit.entity';

@ApiTags('Unit')
@Controller('units')
export class UnitController {
  constructor(private readonly categoryService: UnitService) {}

  @Get()
  @SwaggerFindAll()
  async findAll(): Promise<Unit[]> {
    return this.categoryService.findAll();
  }
}
