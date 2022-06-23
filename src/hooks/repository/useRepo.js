import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';

export function useRepo({ ownerName, repoName, repoClient, options, configuration, axios }) {
  
  const _repoClient = useRepoClient({ repoClient, ...configuration, axios });

  const fetchRepo = () => {
    const repo = _repoClient.repoGet(ownerName, repoName, options?.request).then(({ data }) => data);
    return repo;
  }

  const { data: repo, error, mutate: setRepository } = useSwr([ownerName,repoName], fetchRepo, options?.swr);

  return {
    state: {
      repo,
      error,
      isLoading: !error && !repo && !!ownerName && !!repoName,
    },
    actions: {
      setRepository,
    }
  }
};
