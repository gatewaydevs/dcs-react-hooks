import useSwr from 'swr';
import { useRepoApi } from '../../api/useRepoApi';

export function useRepository({ ownerName, repositoryName, repositoryClient, options, configuration, axios }) {
  
  const _repositoryClient = useRepoApi({repositoryClient, ...configuration, axios});

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
