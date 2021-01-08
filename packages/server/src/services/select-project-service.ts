import { getRepository } from 'typeorm';
import defineProjectAbilitiesFor from '../abilities/project-abilities';
import Project from '../entities/project-entity';
import User from '../entities/user-entity';
import AppError from '../errors/app-error';

interface Request {
  projectId: string;
  userId: string;
  shareId: string;
}

interface Response {
  id: string;
  login: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  bio: string;
  contact: {
    meet?: string | null;
    discord?: string | null;
    zoom?: string | null;
  };
}

export default class SelectProjectService {
  private projectId: string;

  private userId: string;

  private shareId: string;

  private project: Project;

  private user: User;

  private share: User;

  private projectsRepository = getRepository(Project);

  private usersRepository = getRepository(User);

  constructor(data: Request) {
    this.projectId = data.projectId;
    this.userId = data.userId;
    this.shareId = data.shareId;
  }

  public async execute(): Promise<Response> {
    await this.fetchUser();
    await this.fetchProject();
    await this.verifyAbility();
    this.findContact();

    return {
      id: this.share.id,
      login: this.share.login,
      avatar_url: this.share.avatar_url,
      followers: this.share.followers,
      public_repos: this.share.public_repos,
      bio: this.share.bio,
      contact: {
        meet: this.share.contact.meet,
        discord: this.share.contact.discord,
        zoom: this.share.contact.zoom,
      },
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
      relations: ['shares', 'shares.contact'],
    });
  }

  private async verifyAbility(): Promise<void> {
    const abilities = await defineProjectAbilitiesFor(this.user);

    if (!abilities.can('select', this.project))
      throw new AppError('badrequest', 400);
  }

  private findContact(): void {
    const sharesQuery = this.project.shares.find(
      share => share.id === this.shareId,
    );

    if (sharesQuery) this.share = sharesQuery;
    else throw new AppError('nocontact', 404);
  }
}
