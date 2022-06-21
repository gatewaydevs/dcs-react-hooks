import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useUserOrgs({ username, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _orgClient = useOrgClient({ orgClient, token: token?.sha1, ...configuration, axios });

  const fetchUserOrg = () => {
    let orgList = [];

    if ( username ) {
      orgList = _orgClient.orgListUserOrgs(username).then(({ data }) => data);
    } else {
      orgList = _orgClient.orgListCurrentUserOrgs().then(({ data }) => data);
    }
    return orgList;
  }

  const { data: orgList, error, mutate: setUserOrganizationsList }
    = useSwr([username, token], fetchUserOrg, options);

  return {
    state: {
      orgList,
      error,
      isLoading: !error && !orgList && (!!username || !!token),
    },
    actions: {
      setUserOrganizationsList,
    }
  }
};
