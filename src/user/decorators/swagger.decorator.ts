import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export const SwaggerFindOne = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer un utilisateur' }),
    ApiOkResponse({ description: 'Utilisateur récupéré', type: User }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
  );
};

export const SwaggerFindAll = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer les utilisateurs' }),
    ApiOkResponse({ description: 'Liste des utilisateurs', type: PaginationDto<User> }),
  );
};

export const SwaggerUpdate = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Mettre à jour un utilisateur' }),
    ApiOkResponse({ description: 'Utilisateur mis à jour', type: UpdateResult }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
  );
};

export const SwaggerDelete = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Supprimer un utilisateur' }),
    ApiOkResponse({ description: 'Utilisateur supprimé', type: DeleteResult }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
  );
};
