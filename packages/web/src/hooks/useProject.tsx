import { AxiosError } from 'axios';
import { useCallback } from 'react';
import {
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  closeProject,
  Contact,
  createProject,
  FullProject,
  getProject,
  getProjects,
  NewProject,
  Project,
  ProjectPage,
  selectProject,
  shareProject,
} from '../services/projects';

interface ShareRequest {
  id: string;
  page: number;
}

export const useProjectList = (
  jwt: string,
): InfiniteQueryObserverResult<ProjectPage, AxiosError> => {
  const handleNextPageParam = useCallback((lastPage: ProjectPage) => {
    const totalPages = Math.ceil(lastPage.total / lastPage.limit);
    const nextPage = lastPage.page + 1;

    if (nextPage < totalPages) return nextPage;
    return undefined;
  }, []);

  const list = useInfiniteQuery<ProjectPage, AxiosError>(
    'projects',
    ({ pageParam }) => getProjects({ jwt, page: pageParam, limit: 5 }),
    {
      getNextPageParam: handleNextPageParam,
      retry: 5,
      retryDelay: attempt => attempt * 1000,
    },
  );

  return list;
};

export const useOwnProjectList = (
  jwt: string,
): QueryObserverResult<ProjectPage, AxiosError> => {
  const ownList = useQuery<ProjectPage, AxiosError>(
    'ownProjects',
    () => getProjects({ jwt, myOwn: true }),
    {
      retry: 5,
      retryDelay: attempt => attempt * 1000,
    },
  );

  return ownList;
};

export const useGetProject = (
  jwt: string,
  id: string,
): QueryObserverResult<FullProject, AxiosError> => {
  const get = useQuery<FullProject, AxiosError>(
    'project',
    () => getProject(id, jwt),
    {
      retry: 5,
      retryDelay: attempt => attempt * 1000,
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
    },
  );

  return get;
};

export const useShareProject = (
  jwt: string,
): UseMutationResult<Project, unknown, ShareRequest, unknown> => {
  const queryClient = useQueryClient();

  const handleProjectUpdate = useCallback(
    (project: Project, variables: ShareRequest) => {
      const currentData = queryClient.getQueryData<InfiniteData<ProjectPage>>(
        'projects',
      );

      if (currentData) {
        const projectIndex = currentData.pages[
          variables.page
        ].projects.findIndex(item => item.id === variables.id);

        currentData.pages[variables.page].projects.splice(
          projectIndex,
          1,
          project,
        );

        queryClient.setQueryData<InfiniteData<ProjectPage>>('projects', () => ({
          pages: currentData.pages,
          pageParams: currentData.pageParams,
        }));
      }
    },
    [queryClient],
  );

  const share = useMutation(
    (shareRequest: ShareRequest) => shareProject(shareRequest.id, jwt),
    {
      onSuccess: handleProjectUpdate,
    },
  );

  return share;
};

export const useCreateProject = (
  jwt: string,
): UseMutationResult<NewProject, unknown, string, unknown> => {
  const create = useMutation((body: string) => createProject(body, jwt));

  return create;
};

export const useCloseProject = (
  jwt: string,
): UseMutationResult<NewProject, unknown, string, unknown> => {
  const close = useMutation((id: string) => closeProject(id, jwt));

  return close;
};

export const useSelectProject = (
  jwt: string,
): UseMutationResult<
  Contact,
  unknown,
  { projectId: string; userId: string },
  unknown
> => {
  const select = useMutation((data: { projectId: string; userId: string }) =>
    selectProject(data.projectId, data.userId, jwt),
  );

  return select;
};
