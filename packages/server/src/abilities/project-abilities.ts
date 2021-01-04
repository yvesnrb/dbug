import { Ability, defineAbility } from '@casl/ability';
import { Public } from '@casl/ability/dist/types/RuleIndex';
import { getRepository } from 'typeorm';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';

export default (user: User): Promise<Public<Ability>> =>
  defineAbility(async can => {
    const projectsRepository = getRepository(Project);
    const activeUserProjects = await projectsRepository.find({
      where: { author_id: user.id, is_archived: false },
    });

    if (user.contact_id) {
      can('list', 'Project');

      can('get', 'Project', {
        author_id: user.id,
        is_archived: { $eq: false },
      });

      if (activeUserProjects.length === 0) can('create', 'Project');

      can('archive', 'Project', { author_id: user.id });

      can('share', 'Project', {
        author_id: { $ne: user.id },
        'shares.id': { $ne: user.id },
        is_archived: { $eq: false },
      });
    }
  });
