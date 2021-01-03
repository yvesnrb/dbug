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

    if (user.contact_id && activeUserProjects.length === 0)
      can('create', 'Project');

    can('archive', 'Project', { author_id: user.id });

    // can share a project if they do not own it and if their contact is not
    // already on the project and if they have registered their contact
    // information
    // TODO
  });
