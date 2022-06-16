import useSwr from 'swr';
import { useOrgApi } from '../../api/useOrgApi';
import { useAuthentication } from '../user/useAuthentication';

export function useOrganization({ organizationName, organizationClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  
  const _organizationClient = useOrgApi({organizationClient, token: token?.sha1, ...configuration, axios});

  const fetchOrg = () => {
    const organization = _organizationClient.orgGet(organizationName).then(({ data }) => data);
    return organization;
  }

  const { data: organization, error, mutate: setOrganization } = useSwr([organizationName], fetchOrg, options);

  return {
    state: {
      organization,
      error,
      isLoading: !error && !organization && !!organizationName,
    },
    actions: {
      setOrganization,
      getOrganizationClient: () => _organizationClient
    }
  }
};
