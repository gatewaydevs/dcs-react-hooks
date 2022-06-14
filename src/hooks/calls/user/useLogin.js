// import { useEffect, useState } from "react";
// import useSWR from "swr";

// import useUserApi from "../../api/useUserApi";

// export default function useAuth() {

//   const [username, setUsername] = useState(undefined);
//   const [password, setPassword] = useState(undefined);
//   const userClient = useUserApi({ username, password });

//   const fetchAuth = async (username) => {
//     const allTokens = await userClient
//       .userGetTokens(username)
//       .then(({ data }) => data);
//     const appTokens = allTokens?.filter((item) => item.name === TOKEN_ID);

//     if (savedState && allTokens) {
//       if (saveToken)
//         savedState = {
//           ...savedState,
//           settings: {
//             ...savedState.settings,
//             options: {
//               ...savedState.settings.options,
//               saveToken
//             },
//           },
//         };
//       batchDispatch("set", savedState);
//     }

//     if (appTokens?.length > 0) {
//       appTokens.forEach((token) => {
//         userClient
//           .userDeleteAccessToken(username, token.id)
//           .then(({ data }) => data);
//       });
//     }

//     const newToken = await userClient
//       .userCreateToken(username, { name: TOKEN_ID })
//       .then((res) => res.data);

//     if (newToken) {
//       return newToken;
//     }
//   };

//   const {
//     data: token,
//     error,
//     mutate: setAuth,
//   } = useSWR(!!username && !!password ? username : null, fetchAuth);

//   useEffect(() => {
//     if (token?.sha1) dispatch(authAdded(token));
//   }, [token, dispatch]);

//   const fetchUser = () => {
//     const user = userClient.userGetCurrent().then(({ data }) => data);
//     return user;
//   };

//   const {
//     data: user,
//     error: errorUser,
//     mutate: setUser,
//   } = useSWR(
//     !!username && !!password ? { key: "fetchUser", username } : null,
//     fetchUser
//   );

//   useEffect(() => {
//     if (user?.id)
//       dispatch(
//         userAdded({
//           id: user.id,
//           username: user.username,
//           email: user.email,
//           fullName: user.full_name,
//           avatar: user.avatar_url,
//         })
//       );
//   }, [user, dispatch]);

//   /**
//    * Set data needed to generate a new token
//    * @param {Object} basic - Object with basic user info needed to generate a new token
//    * @param {string} basic.username - The username
//    * @param {string} basic.password - The user password
//    */
//   const setToken = ({ username, password }) => {
//     if (username && password) {
//       setUsername(username);
//       setPassword(password);
//     } else {
//       setAuth(null);
//       setUser(null);
//     }
//   };

//   return {
//     token,
//     user,
//     setToken,
//     isLoading: !error && !token && !!username && !!password,
//     isError: error,
//   };
// }
