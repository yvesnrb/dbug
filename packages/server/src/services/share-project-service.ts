import { getRepository } from 'typeorm';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';
import AppError from '../errors/app-error';

interface Request {
  projectId: string;
  userId: string;
}

interface Response {
  id: string;
  body: string;
  is_archived: boolean;
  author: {
    id: string;
    login: string;
    avatar_url: string;
    contact: {
      meet: boolean;
      discord: boolean;
      zoom: boolean;
    };
  };
  hasShared: boolean;
  created_at: Date;
  updated_at: Date;
}

export default class ShareProjectService {
  private projectId: string;

  private userId: string;

  private user: User;

  private project: Project;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(data: Request) {
    this.projectId = data.projectId;
    this.userId = data.userId;
  }

  public async execute(): Promise<Response> {
    await this.fetchUser();
    await this.fetchProject();
    await this.verifyAbility();
    await this.pushUserIntoShares();

    return {
      id: this.project.id,
      body: this.project.body,
      is_archived: this.project.is_archived,
      author: {
        id: this.project.author.id,
        login: this.project.author.login,
        avatar_url: this.project.author.avatar_url,
        contact: {
          meet: Boolean(this.project.author.contact.meet),
          discord: Boolean(this.project.author.contact.discord),
          zoom: Boolean(this.project.author.contact.zoom),
        },
      },
      hasShared: true,
      created_at: this.project.created_at,
      updated_at: this.project.updated_at,
    };
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async fetchProject(): Promise<void> {
    this.project = await this.projectsRepository.findOneOrFail({
      where: { id: this.projectId },
      relations: ['author', 'author.contact', 'shares'],
    });
  }

  public async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('share', this.project))
      throw new AppError('badrequest', 400);
  }

  public async pushUserIntoShares(): Promise<void> {
    this.project.shares = [...this.project.shares, this.user];

    await this.projectsRepository.save(this.project);
  }
}
