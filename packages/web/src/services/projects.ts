import api from './api';

export interface Project {
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
  hasShared: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectPage {
  projects: Project[];
  page: number;
  limit: number;
  total: number;
}

export interface Request {
  jwt: string;
  page?: number;
  limit?: number;
  isArchived?: boolean;
  myOwn?: boolean;
}

export async function getProjects(data: Request): Promise<ProjectPage> {
  const { jwt, page = 0, limit = 10, isArchived = false, myOwn = false } = data;

  const response = await api.get<ProjectPage>('projects', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      page,
      limit,
      isArchived,
      myOwn,
    },
  });

  return response.data;
}

export async function shareProject(id: string, jwt: string): Promise<Project> {
  const response = await api.post<Project>(
    `projects/${id}/share`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return response.data;
}
