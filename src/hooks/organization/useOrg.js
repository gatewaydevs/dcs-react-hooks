import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useOrg({ orgName, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  
  const _orgClient = useOrgClient({orgClient, token: token?.sha1, ...configuration, axios});

  const fetchOrg = () => {
    const organization = _orgClient.orgGet(orgName).then(({ data }) => data);
    return organization;
  }

  const { data: organization, error, mutate: setOrganization } = useSwr([orgName], fetchOrg, options);

  return {
    state: {
      organization,
      error,
      isLoading: !error && !organization && !!orgName,
    },
    actions: {
      setOrganization,
      getorgClient: () => _orgClient
    }
  }
};
