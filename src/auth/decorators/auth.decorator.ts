import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { accessTokenKey } from '../constants/auth.constant';
import { AbilityGuard } from '../../ability/guards/ability.guard';

export const Auth = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(AbilityGuard),
    ApiBearerAuth(accessTokenKey),
    ApiUnauthorizedResponse({ description: "Vous n'êtes pas autorisé" }),
  );
};
