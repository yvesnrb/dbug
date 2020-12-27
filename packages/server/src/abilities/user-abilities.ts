import { Ability, defineAbility } from '@casl/ability';
import { Public } from '@casl/ability/dist/types/RuleIndex';
import User from '../entities/user-entity';

export default (user: User): Public<Ability> =>
  defineAbility((can, cannot) => {
    if (user.contact_id) {
      can('update', 'Contact', { id: user.contact_id });
      cannot('create', 'Contact');
    }

    if (!user.contact_id) {
      can('create', 'Contact');
      cannot('update', 'Contact');
    }
  });
