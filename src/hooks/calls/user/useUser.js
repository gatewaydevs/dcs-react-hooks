import { useState } from "react";
import useSWR from "swr";

import useUserApi from "../../api/useUserApi";

export default function useUser({ username, password }) {
  const userClient = useUserApi({ username, password });

  const fetchUser = () => {
    const user = userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error: errorUser,
    mutate: setUser,
  } = useSWR( username && password ? { key: "fetchedUser", username, password } : null, fetchUser);

  /**
   * Set data needed to generate a new token
   * @param {Object} basic - Object with basic user info needed to generate a new token
   * @param {string} basic.username - The username
   * @param {string} basic.password - The user password
   */
  const setUserClient = ({ username, password }) => {
    setUsername(username);
    setPassword(password);
    setUser(undefined);
  };

  return {
    actions: {
      setUser,
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
