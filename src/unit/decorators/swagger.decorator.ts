import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Unit } from '../entities/unit.entity';

export const SwaggerFindAll = () => {
  return applyDecorators(ApiOperation({ summary: 'Récupérer les unités' }), ApiOkResponse({ description: 'Liste des unités', type: Array<Unit> }));
};
