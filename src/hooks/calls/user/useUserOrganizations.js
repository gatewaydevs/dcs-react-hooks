import useSwr from 'swr';
import { useOrgApi } from '../../api/useOrgApi';
import { useAuthentication } from '../user/useAuthentication';

export function useUserOrganizations({ username, organizationClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _organizationClient = useOrgApi({organizationClient, token: token?.sha1, ...configuration, axios});

  const fetchUserOrg = () => {
    let orgList = [];

    if ( username ) {
      orgList = _organizationClient.orgListUserOrgs(username).then(({ data }) => data);
    } else {
      orgList = _organizationClient.orgListCurrentUserOrgs().then(({ data }) => data);
    }
    return orgList;
  }

  const { data: orgList, error, mutate: setUserOrganizationsList }
    = useSwr([username], fetchUserOrg, options);

  return {
    state: {
      orgList,
      error,
      isLoading: !error && !orgList,
    },
    actions: {
      setUserOrganizationsList,
    }
  }
};
