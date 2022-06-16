import useSwr from 'swr';
import { useOrgApi } from '../../api/useOrgApi';
import { useAuthentication } from '../user/useAuthentication';

export function useUserOrganization({ username, organizationName, organizationClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  console.log("useUserOrganization() token:",token)
  const _organizationClient = useOrgApi({organizationClient, token: token?.sha1, ...configuration, axios});

  const fetchUserOrg = () => {
    console.log("useUserOrganization() enter fetchUserOrg()")
    let orgList = [];

    if ( username ) {
      orgList = _organizationClient.orgListUserOrgs(username).then(({ data }) => data);
    } else {
      orgList = _organizationClient.orgListCurrentUserOrgs(token).then(({ data }) => data);
    }
    console.log("useUserOrganization() exit fetchUserOrg(), orgList:", orgList)
    return orgList;
  }

  const { data: orgList, error, mutate: setOrganization } // setUser??
    = useSwr([username,organizationName], fetchUserOrg, options);

  return {
    state: {
      orgList,
      error,
      isLoading: !error && !orgList && !!organizationName,
    },
    actions: {
      setOrganization,
      // what about setUser??
    }
  }
};
