import { useState } from "react";
import useSWR from "swr";

import { useUserApi } from "../../clients/useUserClient";

export default function useLogin({tokenId}) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const userClient = useUserClient({ username, password });

  const fetchAuth = async (username) => {
    const allTokens = await userClient
      .userGetTokens(username)
      .then(({ data }) => data);
    const appTokens = allTokens?.filter((item) => item.name === tokenId);

    if (appTokens?.length > 0) {
      appTokens.forEach((token) => {
        userClient
          .userDeleteAccessToken(username, token.id)
          .then(({ data }) => data);
      });
    }

    const newToken = await userClient
      .userCreateToken(username, { name: tokenId })
      .then((res) => res.data);

    if (newToken) {
      return newToken;
    }
  };

  const {
    data: token,
    error,
    mutate: setAuth,
  } = useSWR(!!username && !!password ? username : null, fetchAuth);

  const fetchUser = () => {
    const user = userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error: errorUser,
    mutate: setUser,
  } = useSWR(
    !!username && !!password ? { key: "fetchUser", username } : null,
    fetchUser
  );

  /**
   * Set data needed to generate a new token
   * @param {Object} basic - Object with basic user info needed to generate a new token
   * @param {string} basic.username - The username
   * @param {string} basic.password - The user password
   */
  const setToken =  ({ username, password }) => {
    if (username && password) {
      setUsername(username);
      setPassword(password);
    } else {
      setAuth(null);
      setUser(null);
    }
  };

  return {
    state: {
      token,
      user,
      isLoading: !error && !token && !!username && !!password,
      isError: {...error, ...errorUser},
    },
    actions: {
      setToken,
    }
  };
}
