import { getRepository } from 'typeorm';
import Project from '../entities/project-entity';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import AppError from '../errors/app-error';
import User from '../entities/user-entity';

interface ProjectsListItem {
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

interface Request {
  page: number;
  limit: number;
  isArchived: boolean;
  myOwn: boolean;
  userId: string;
}

interface Response {
  projects: ProjectsListItem[];
  page: number;
  limit: number;
  total: number;
}

export default class GetProjectPageService {
  private projects: ProjectsListItem[];

  private user: User;

  private page: number;

  private limit: number;

  private total: number;

  private isArchived: boolean;

  private myOwn: boolean;

  private userId: string;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(data: Request) {
    this.page = data.page;
    this.limit = data.limit;
    this.isArchived = data.isArchived;
    this.myOwn = data.myOwn;
    this.userId = data.userId;
  }

  public async execute(): Promise<Response> {
    await this.fetchUser();
    await this.verifyAbility();
    await this.fetchPage();

    return {
      projects: this.projects,
      page: this.page,
      limit: this.limit,
      total: this.total,
    };
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('list', 'Project'))
      throw new AppError('badrequest', 400);
  }

  private async fetchPage(): Promise<void> {
    const projects: ProjectsListItem[] = [];

    const [results, total] = await this.projectsRepository.findAndCount({
      take: this.limit,
      skip: this.page * this.limit,
      relations: ['author', 'author.contact', 'shares'],
      order: { created_at: 'DESC' },
      where: {
        is_archived: this.isArchived,
        ...(this.myOwn && { author_id: this.userId }),
      },
    });

    results.forEach(project => {
      projects.push({
        id: project.id,
        body: project.body,
        is_archived: project.is_archived,
        author: {
          id: project.author.id,
          login: project.author.login,
          avatar_url: project.author.avatar_url,
          contact: {
            meet: Boolean(project.author.contact.meet),
            discord: Boolean(project.author.contact.discord),
            zoom: Boolean(project.author.contact.zoom),
          },
        },
        hasShared: project.shares.some(share => share.id === this.userId),
        created_at: project.created_at,
        updated_at: project.updated_at,
      });
    });

    this.projects = projects;
    this.total = total;
  }
}
