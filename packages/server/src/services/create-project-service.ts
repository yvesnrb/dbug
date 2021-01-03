import { getRepository } from 'typeorm';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import AppError from '../errors/app-error';

interface Request {
  userId: string;
  body: string;
}

class CreateProjectService {
  private user: User;

  private body: string;

  private userId: string;

  private project: Project;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(request: Request) {
    this.userId = request.userId;
    this.body = request.body;
  }

  public async execute(): Promise<Project> {
    await this.fetchUser();
    await this.verifyAbility();
    await this.createProject();

    return this.project;
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('create', 'Project'))
      throw new AppError('badrequest', 400);
  }

  public async createProject(): Promise<void> {
    this.project = new Project();

    this.project.body = this.body;
    this.project.author_id = this.userId;
    this.project.is_archived = false;

    await this.projectsRepository.save(this.project);
  }
}

export default CreateProjectService;
