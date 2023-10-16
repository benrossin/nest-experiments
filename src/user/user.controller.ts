import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { SwaggerDelete, SwaggerFindAll, SwaggerFindOne, SwaggerUpdate } from './decorators/swagger.decorator';
import { CheckAbilities } from '../ability/decorators/abilities.decorator';
import { Action } from '../ability/enums/actions.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, @InjectRepository(User) private userRepository: Repository<User>) {}

  @Get(':id')
  @Auth()
  @CheckAbilities({ action: Action.Read, subject: User })
  @SwaggerFindOne()
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get()
  @Auth()
  @CheckAbilities({ action: Action.Read, subject: User })
  @SwaggerFindAll()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto): Promise<PaginationDto<User>> {
    return this.userService.findAll(paginationQueryDto);
  }

  @Patch(':id')
  @Auth()
  @CheckAbilities({ action: Action.Update, subject: User })
  @SwaggerUpdate()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth()
  @CheckAbilities({ action: Action.Delete, subject: User })
  @SwaggerDelete()
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
