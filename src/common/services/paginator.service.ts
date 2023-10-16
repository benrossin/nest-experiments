import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PaginatorService {
  /**
   * Récupère le skip et take
   */
  private getPaginateArgs(paginationQueryDto: PaginationQueryDto): { skip: number; take: number } {
    return {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.perPage,
      take: paginationQueryDto.perPage,
    };
  }

  /**
   * Créer une pagination avec les metas
   */
  async paginate(repository: Repository<any>, paginationQueryDto: PaginationQueryDto & FindManyOptions): Promise<PaginationDto<any>> {
    const findManyArgs = this.getPaginateArgs(paginationQueryDto);
    const [count, data] = await Promise.all([repository.count(), repository.find({ ...findManyArgs })]);
    const metaData = new PaginationMetaDto({ pageOptionsDto: paginationQueryDto, itemCount: count });
    return new PaginationDto(data, metaData);
  }
}
