import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { AbilityBuilder, AbilityClass, ConditionsMatcher, ExtractSubjectType, InferSubjects, MatchConditions, PureAbility } from '@casl/ability';
import { Action } from './enums/actions.enum';
import { Role } from '../user/enums/roles.enum';
import { Parcours } from '../parcours/entities/parcours.entity';

export type Subjects = InferSubjects<typeof User | typeof Parcours | 'all'>;

export type AppAbility = PureAbility<[Action, Subjects]>;
const lambdaMatcher: ConditionsMatcher<MatchConditions> = (matchConditions) => matchConditions;

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility as AbilityClass<AppAbility>);

    if (user.role === Role.ADMIN) {
      can(Action.Manage, 'all');
    }

    if (user.role === Role.USER) {
      /* USER */
      cannot(Action.Read, User);
      cannot(Action.Update, User, { id: user.id });
      cannot(Action.Delete, User, { id: user.id });
      /* PARCOURS */
      cannot(Action.Create, Parcours, { 'user.id': user.id });
      cannot(Action.Update, Parcours, { 'user.id': user.id });
      cannot(Action.Delete, Parcours, { 'user.id': user.id });
    }

    return build({
      conditionsMatcher: lambdaMatcher,
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
