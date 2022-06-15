import useSwr from 'swr';
import { useRepoApi } from '../../api/useRepoApi';

export function useRepository({ ownerName, repositoryName, options, config }) {
  
  const repositoryClient = useRepoApi({...config});

  const fetchRepo = () => {
    const repository = repositoryClient.repoGet(ownerName, repositoryName).then(({ data }) => data);
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