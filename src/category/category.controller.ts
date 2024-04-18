import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerFindAll } from './decorators/swagger.decorator';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @SwaggerFindAll()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
