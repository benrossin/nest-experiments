import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../ability.factory';
import { RequiredRule } from '../decorators/abilities.decorator';
import { Request } from 'express';
import { User } from '../../user/entities/user.entity';
import { ForbiddenError } from '@casl/ability';
import { checkAbility } from '../constants/ability.constant';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(private reflector: Reflector, private caslAbilityFactory: AbilityFactory) {}

  canActivate(ctx: ExecutionContext): boolean {
    const rules = this.reflector.get<RequiredRule[]>(checkAbility, ctx.getHandler()) || [];

    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as User;

    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      return rules.every((rule) => ability.can(rule.action, rule.subject));
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
