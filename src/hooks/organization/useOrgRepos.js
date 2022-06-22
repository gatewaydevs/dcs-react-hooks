import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useOrgRepos({ orgName, page, limit, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _orgClient = useOrgClient({orgClient, token: token?.sha1, ...configuration, axios});

  const fetchOrgRepos = () => {
    const orgRepos = _orgClient.orgListRepos(orgName, page, limit, options?.request).then(({ data }) => data);
    return orgRepos;
  }

  const { data: orgRepos, error, mutate: setOrgRepos } = useSwr([orgName,page,limit], fetchOrgRepos, options?.swr);

  return {
    state: {
      orgRepos,
      error,
      isLoading: !error && !orgRepos,
    },
    actions: {
      setOrgRepos,
      getOrgClient: () => _orgClient
    }
  }
};
