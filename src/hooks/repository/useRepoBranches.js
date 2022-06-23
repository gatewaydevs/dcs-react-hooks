import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';

export function useRepoBranches({ ownerName, repoName, page, limit, repoClient, options, configuration, axios }) {
  
  const _repoClient = useRepoClient({ repoClient, ...configuration, axios });

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
