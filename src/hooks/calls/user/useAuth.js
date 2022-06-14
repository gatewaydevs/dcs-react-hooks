import { useState } from "react";
import useSWR from "swr";

import useUserApi from "../../api/useUserApi";

export default function useAuth({tokenName}) {
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const userClient = useUserApi({ username, password });

  const fetchToken = async () => {
    console.log('entered fetchToken');
    console.log({ username, password });

    if (!username || !password) return;
    
    console.log('fetching token');
    const allTokens = await userClient
      .userGetTokens(username)
      .then(({ data }) => data);
    console.log({allTokens});
    const appTokens = allTokens?.filter((item) => item.name === tokenName);
    console.log({ appTokens });
    
    if (appTokens?.length > 0) {
      appTokens.forEach((token) => {
        userClient
          .userDeleteAccessToken(username, token.id)
          .then(({ data }) => data);
      });
    }

    const newToken = await userClient
      .userCreateToken(username, { name: tokenName })
      .then((res) => res.data);
    
    if (newToken) {
      return newToken;
    }
  };

  const {
    data: token,
    error,
    mutate: setToken,
  } = useSWR(tokenName, fetchToken);

  const fetchUser = () => {
    if (!username || !password) return;
    const user = userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error: errorUser,
    mutate: setUser,
  } = useSWR(
    "fetchedUser",
    fetchUser
  );

  /**
   * Set data needed to generate a new token
   * @param {Object} basic - Object with basic user info needed to generate a new token
   * @param {string} basic.username - The username
   * @param {string} basic.password - The user password
   */
  const setAuth = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
  };

  const clearAuth = () => {
    setUsername(undefined);
    setPassword(undefined);
    setToken(undefined, false);
    setUser(undefined, false);
  }

  return {
    actions: {
      setAuth,
      clearAuth
    },
    state: {
      token,
      user,
      isLoadig: !error && !token && !!username && !!password,
      isError: error || errorUser,
    }
  };
}
