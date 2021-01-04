import { getRepository } from 'typeorm';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import AppError from '../errors/app-error';

interface Request {
  id: string;
  userId: string;
}

export default class ArchiveProjectService {
  private id: string;

  private userId: string;

  private project: Project;

  private user: User;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(data: Request) {
    this.id = data.id;
    this.userId = data.userId;
  }

  public async execute(): Promise<Project> {
    await this.fetchUser();
    await this.fetchProject();
    await this.verifyAbility();
    await this.archiveProject();

    return this.project;
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async fetchProject(): Promise<void> {
    this.project = await this.projectsRepository.findOneOrFail({
      where: { id: this.id },
    });
  }

  public async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('archive', this.project))
      throw new AppError('badrequest', 400);
  }

  public async archiveProject(): Promise<void> {
    this.project.is_archived = true;

    await this.projectsRepository.save(this.project);
  }
}
