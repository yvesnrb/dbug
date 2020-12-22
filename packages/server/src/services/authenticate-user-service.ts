import axios from 'axios';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '../entities/user-entity';
import AppError from '../errors/app-error';

interface OauthResponse {
  access_token: string;
  token_type: string;
}

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  bio: string;
  followers: number;
  public_repos: number;
}

interface Response {
  user: User;
  jwt: string;
}

class AuthenticateUserService {
  private githubCode: string;

  private githubToken = '';

  private githubUser = {} as GithubUser;

  private usersRepository = getRepository(User);

  private User = {} as User;

  private jwt = '';

  constructor(code: string) {
    this.githubCode = code;
  }

  public async execute(): Promise<Response> {
    await this.fetchGithubToken();
    await this.fetchGithubUser();
    await this.createOrUpdateUser();
    this.createJWT();

    return {
      user: this.User,
      jwt: this.jwt,
    };
  }

  private async createOrUpdateUser(): Promise<void> {
    const registeredUser = await this.usersRepository.findOne({
      where: { githubId: this.githubUser.id },
    });

    if (registeredUser) {
      registeredUser.bio = this.githubUser.bio;
      registeredUser.public_repos = this.githubUser.public_repos;
      registeredUser.followers = this.githubUser.followers;
      registeredUser.avatar_url = this.githubUser.avatar_url;

      this.User = registeredUser;
      await this.usersRepository.save(registeredUser);
    } else {
      const newUser = new User();

      newUser.login = this.githubUser.login;
      newUser.githubId = this.githubUser.id;
      newUser.bio = this.githubUser.bio;
      newUser.public_repos = this.githubUser.public_repos;
      newUser.followers = this.githubUser.followers;
      newUser.avatar_url = this.githubUser.avatar_url;

      this.User = newUser;
      await this.usersRepository.save(newUser);
    }
  }

  private createJWT(): void {
    const { JWT_KEY = '', JWT_EXP = '1h' } = process.env;

    this.jwt = jwt.sign({}, JWT_KEY, {
      subject: this.User.id,
      expiresIn: JWT_EXP,
    });
  }

  private async fetchGithubToken(): Promise<void> {
    try {
      const response = await axios.post<OauthResponse>(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: this.githubCode,
        },
        {
          headers: {
            accept: 'application/json',
          },
        },
      );

      this.githubToken = response.data.access_token;
    } catch (err) {
      throw new AppError('unauthorized', 401);
    }
  }

  private async fetchGithubUser(): Promise<void> {
    try {
      const response = await axios.get<GithubUser>(
        'https://api.github.com/user',
        {
          headers: {
            accept: 'application/json',
            Authorization: `token ${this.githubToken}`,
          },
        },
      );

      this.githubUser = response.data;
    } catch (err) {
      throw new AppError('unauthorized', 401);
    }
  }
}

export default AuthenticateUserService;
