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

export interface NewProject {
  id: string;
  body: string;
  is_archived: boolean;
  hasShared: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FullProject {
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
  shares: Share[];
  created_at: Date;
  updated_at: Date;
}

export interface Share {
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

export interface Contact {
  id: string;
  login: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  bio: string;
  contact: {
    meet: string | null;
    discord: string | null;
    zoom: string | null;
  };
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

export async function getProject(
  id: string,
  jwt: string,
): Promise<FullProject> {
  const response = await api.get<FullProject>(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
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

export async function createProject(
  body: string,
  jwt: string,
): Promise<NewProject> {
  const response = await api.post<NewProject>(
    '/projects',
    { body },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return response.data;
}

export async function closeProject(
  id: string,
  jwt: string,
): Promise<NewProject> {
  const response = await api.delete<NewProject>(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
}

export async function selectProject(
  projectId: string,
  userId: string,
  jwt: string,
): Promise<Contact> {
  const response = await api.post<Contact>(
    `/projects/${projectId}/select/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return response.data;
}
