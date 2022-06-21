import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';

export function useRepo({ ownerName, repoName, repoClient, options, configuration, axios }) {
  
  const _repoClient = useRepoClient({ repoClient, ...configuration, axios });

  const fetchRepo = () => {
    const repository = _repoClient.repoGet(ownerName, repoName).then(({ data }) => data);
    return repository;
  }

  const { data: repository, error, mutate: setRepository } = useSwr([ownerName,repoName], fetchRepo, options);

  return {
    state: {
      repository,
      error,
      isLoading: !error && !repository && !!ownerName && !!repoName,
    },
    actions: {
      setRepository,
    }
  }
};
