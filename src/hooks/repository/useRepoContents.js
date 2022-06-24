import useSwr from 'swr';
import { useRepoClient } from '@hooks/clients/useRepoClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useRepoContents({ ownerName, repoName, filepath, ref, raw = true, repoClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _repoClient = useRepoClient({ repoClient, token: token?.sha1, ...configuration, axios });

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
