import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useRepoBranches({ ownerName, repoName, page, limit, repoClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  
  const _repoClient = useRepoClient({ repoClient, token: token?.sha1, ...configuration, axios });

  const fetchRepo = () => {
    const repoBranches = _repoClient.repoListBranches(ownerName, repoName, page, limit, options?.request).then(({ data }) => data);
    return repoBranches;
  }

  const { data: repoBranches, error, mutate: setRepoBranches } = useSwr([ownerName,repoName], fetchRepo, options?.swr);

  return {
    state: {
      repoBranches,
      error,
      isLoading: !error && !repoBranches && !!ownerName && !!repoName,
    },
    actions: {
      setRepoBranches,
    }
  }
};
