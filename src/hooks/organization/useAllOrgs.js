import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useAllOrgs({ lang, page, limit, orgClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});

  const _orgClient = useOrgClient({orgClient, token: token?.sha1, ...configuration, axios});

  const fetchOrgs = () => {
    const orgs = _orgClient.orgGetAll(lang, page, limit, options?.request).then(({ data }) => data);
    return orgs;
  }

  const { data: orgs, error, mutate: setOrgs } = useSwr("orgGetAll", fetchOrgs, options?.swr);

  return {
    state: {
      orgs,
      error,
      isLoading: !error && !orgs,
    },
    actions: {
      setOrgs,
      getOrgClient: () => _orgClient
    }
  }
};
