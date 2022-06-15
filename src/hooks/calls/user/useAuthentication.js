import { useEffect } from "react";
import useSWR from "swr";
import { useUserApi } from "../../api/useUserApi";

export function useAuthentication({tokenName, username, password, userClient, options, configuration, axios}) {
  const _userClient = useUserApi({ userClient, username, password, ...configuration, axios});

  const fetchAuth = async (username) => {

    if (!username && !password && !tokenName) throw new Error("missing tokenName, username or password");

    const allTokens = await _userClient
      .userGetTokens(username)
      .then(({ data }) => data);
    const appTokens = allTokens?.filter((item) => item.name === tokenName);

    console.log({allTokens});

    if (appTokens?.length > 0) {
      appTokens.forEach(() => {
        _userClient
          .userDeleteAccessToken(username, tokenName)
          .then(({ data }) => data);
      });
    }

    const newToken = await _userClient
      .userCreateToken(username, { name: tokenName })
      .then((res) => res.data);

    if (newToken) {
      return newToken;
    }
  };

  const {
    data: token,
    error,
    mutate: setAuth,
  } = useSWR(username ? username : null, fetchAuth, options);

  const fetchUser = () => {
    const user = _userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error: errorUser,
    mutate: setUser,
  } = useSWR(
    !!username && !!password ? { key: "fetchUser", username } : null,
    fetchUser,
    options
  );
  
  useEffect(() => {
    if (!token && !password) {
      setAuth(null);
      setUser(null);
    }
  }, [password, setAuth, setUser, token]);

  return {
    state: {
      token,
      user,
      isLoading: !error && !token && !!username && !!password,
      isError: {...error, ...errorUser},
    },
    actions: {
      setUser,
      setAuth
    }
  };
}
