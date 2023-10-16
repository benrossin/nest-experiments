import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { RefreshJwtAuthGuard } from '../guards/refresh-jwt-auth.guard';
import { accessTokenKey } from '../constants/auth.constant';

export const SwaggerRegister = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Inscrire un utilisateur' }),
    ApiCreatedResponse({ description: 'Utilisateur inscrit' }),
    ApiOkResponse({ description: 'Utilisateur récupéré', type: User }),
  );
};

export const SwaggerLogin = () => {
  return applyDecorators(
    ApiBody({ type: LoginAuthDto }),
    ApiOperation({ summary: 'Connecter un utilisateur' }),
    ApiOkResponse({ description: 'Utilisateur connecté' }),
    ApiBadRequestResponse({ description: 'Identifiant ou mot de passe incorrect' }),
  );
};

export const SwaggerLogout = () => {
  return applyDecorators(
    ApiOperation({ summary: "Déconnecter l'utilisateur" }),
    ApiOkResponse({ description: 'Utilisateur déconnecté', type: Boolean }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
  );
};

export const SwaggerForgotPassword = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Récupérer le mot de passe oublié' }),
    ApiOkResponse({ description: 'Email de récupération de mot de passe envoyé', type: Boolean }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
    ApiForbiddenResponse({ description: "Erreur lors de l'envoi du mail" }),
  );
};

export const SwaggerResetPassword = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Mettre à jour le mot de passe' }),
    ApiOkResponse({ description: 'Le mot de passe a été mis à jour' }),
    ApiBadRequestResponse({ description: 'Erreur lors du changement du mot de passe' }),
  );
};

export const SwaggerMe = () => {
  return applyDecorators(
    ApiOperation({ summary: "Récupérer les informations de l'utilisateur connecté" }),
    ApiOkResponse({ description: "Informations de l'utilisateur connecté", type: User }),
    ApiNotFoundResponse({ description: 'Utilisateur introuvable' }),
  );
};

export const SwaggerRefreshTokens = () => {
  return applyDecorators(
    UseGuards(RefreshJwtAuthGuard),
    ApiBearerAuth(accessTokenKey),
    ApiOperation({ summary: "Met à jour les tokens de l'utilisateur connecté" }),
    ApiOkResponse({ description: "Nouveaux tokens de l'utilisateur connecté", type: Boolean }),
  );
};
