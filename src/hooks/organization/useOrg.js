import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useOrg({ orgName, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  
  const _orgClient = useOrgClient({orgClient, token: token?.sha1, ...configuration, axios});

  const fetchOrg = () => {
    const org = _orgClient.orgGet(orgName,options?.request).then(({ data }) => data);
    return org;
  }

  const { data: org, error, mutate: setOrg } = useSwr([orgName], fetchOrg, options?.swr);

  return {
    state: {
      org,
      error,
      isLoading: !error && !org && !!orgName,
    },
    actions: {
      setOrg,
      getOrgClient: () => _orgClient
    }
  }
};
