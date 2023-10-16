import { Action } from '../enums/actions.enum';
import { Subjects } from '../ability.factory';
import { SetMetadata } from '@nestjs/common';
import { checkAbility } from '../constants/ability.constant';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(checkAbility, requirements);
