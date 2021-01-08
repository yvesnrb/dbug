import { getRepository } from 'typeorm';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';
import AppError from '../errors/app-error';

interface Share {
  id: string;
  login: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  bio: string;
  contact: {
    meet: boolean;
    discord: boolean;
    zoom: boolean;
  };
}

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
    followers: number;
    public_repos: number;
    contact: {
      meet: boolean;
      discord: boolean;
      zoom: boolean;
    };
  };
  shares: Share[];
  created_at: Date;
  updated_at: Date;
}

export default class GetProjectService {
  private project: Project;

  private user: User;

  private shares: Share[] = [];

  private userId: string;

  private projectId: string;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(data: Request) {
    this.userId = data.userId;
    this.projectId = data.projectId;
  }

  public async execute(): Promise<Response> {
    await this.fetchUser();
    await this.fetchProject();
    await this.verifyAbility();
    this.assembleShares();

    return {
      id: this.project.id,
      body: this.project.body,
      is_archived: this.project.is_archived,
      author: {
        id: this.project.author.id,
        login: this.project.author.login,
        avatar_url: this.project.author.avatar_url,
        followers: this.project.author.followers,
        public_repos: this.project.author.public_repos,
        contact: {
          meet: Boolean(this.project.author.contact.meet),
          discord: Boolean(this.project.author.contact.discord),
          zoom: Boolean(this.project.author.contact.zoom),
        },
      },
      shares: this.shares,
      created_at: this.project.created_at,
      updated_at: this.project.updated_at,
    };
  }

  private async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  private async fetchProject(): Promise<void> {
    this.project = await this.projectsRepository.findOneOrFail({
      where: { id: this.projectId },
      relations: ['author', 'author.contact', 'shares', 'shares.contact'],
    });
  }

  private async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('get', this.project))
      throw new AppError('badrequest', 400);
  }

  private assembleShares(): void {
    this.shares = this.project.shares.map(share => ({
      id: share.id,
      login: share.login,
      avatar_url: share.avatar_url,
      followers: share.followers,
      public_repos: share.public_repos,
      bio: share.bio,
      contact: {
        meet: Boolean(share.contact.meet),
        discord: Boolean(share.contact.discord),
        zoom: Boolean(share.contact.zoom),
      },
    }));
  }
}
