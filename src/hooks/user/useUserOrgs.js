import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useUserOrgs({ username, page, limit, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _orgClient = useOrgClient({ orgClient, token: token?.sha1, ...configuration, axios });

  const fetchUserOrg = () => {
    const orgList = _orgClient.orgListUserOrgs(username,page,limit,options?.request).then(({ data }) => data);
    return orgList;
  }

  const { data: orgList, error, mutate: setUserOrganizationsList }
    = useSwr([username, token], fetchUserOrg, options?.swr);

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
