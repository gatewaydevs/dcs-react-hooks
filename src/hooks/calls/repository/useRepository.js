import useSwr from 'swr';
import { useRepoClient } from '../../clients/useRepoClient';

export function useRepository({ ownerName, repositoryName, repositoryClient, options, configuration, axios }) {
  
  const _repositoryClient = useRepoClient({ repositoryClient, ...configuration, axios });

  const fetchRepo = () => {
    const repository = _repositoryClient.repoGet(ownerName, repositoryName).then(({ data }) => data);
    return repository;
  }

  const { data: repository, error, mutate: setRepository } = useSwr([ownerName,repositoryName], fetchRepo, options);

  return {
    state: {
      repository,
      error,
      isLoading: !error && !repository && !!ownerName && !!repositoryName,
    },
    actions: {
      setRepository,
    }
  }
};
