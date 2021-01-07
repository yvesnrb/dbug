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
  getProjects,
  Project,
  ProjectPage,
  shareProject,
} from '../services/projects';

interface Request {
  jwt: string;
}

interface Response {
  list: InfiniteQueryObserverResult<ProjectPage, AxiosError>;
  ownList: QueryObserverResult<ProjectPage, AxiosError>;
  share: UseMutationResult<Project, unknown, ShareRequest, unknown>;
}

interface ShareRequest {
  id: string;
  page: number;
}

export const useProject = (request: Request): Response => {
  const { jwt } = request;
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
    },
  );

  const ownList = useQuery<ProjectPage, AxiosError>('ownProjects', () =>
    getProjects({ jwt, myOwn: true }),
  );

  const share = useMutation(
    (shareRequest: ShareRequest) => shareProject(shareRequest.id, jwt),
    {
      onSuccess: handleProjectUpdate,
    },
  );

  return { list, ownList, share };
};
