import useSwr from 'swr';
import useRepoApi from '../../api/useRepoApi';

export function useRepository() {
  
  const repositoryClient = new useRepoApi({});

  const fetcher = () => {
    const repository = repositoryClient.repoGet('Es-419_gl', 'es-419_tn').then(({ data }) => data);
    return repository;
  }

  const { data, error } = useSwr('', fetcher);

  return {data, error}
}