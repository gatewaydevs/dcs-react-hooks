import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';

export function useRepoContents({ ownerName, repoName, filepath, ref, raw = true, repoClient, options, configuration, axios }) {
  
  const _repoClient = useRepoClient({ repoClient, ...configuration, axios });

  const fetchRepo = () => {
    const repoContents = raw
      ? _repoClient.repoGetRawFile(ownerName, repoName, filepath, ref, options?.request).then(({ data }) => data)
      : _repoClient.repoGetContents(ownerName, repoName, filepath, ref, options?.request).then(({ data }) => data);
    return repoContents;
  }

  const { data: repoContents, error, mutate: setRepoContents } = useSwr([ownerName, repoName, filepath, ref, raw], fetchRepo, options?.swr);

  return {
    state: {
      repoContents,
      error,
      isLoading: !error && !repoContents && !!ownerName && !!repoName && !!filepath,
    },
    actions: {
      setRepoContents,
    }
  }
};
