import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { InsertResult } from 'typeorm';

export const SwaggerCreate = () => {
  return applyDecorators(ApiOperation({ summary: 'Créer une session' }), ApiOkResponse({ description: 'Session créée', type: InsertResult }));
};
