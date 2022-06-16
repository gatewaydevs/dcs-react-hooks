### Authenticated request

```js
import React, { useEffect, useState } from 'react';
import { useUserApi } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const userClient = useUserApi({basePath: "https://qa.door43.org/api/v1/", username, password});
  console.log(userClient);

  useEffect(async () => {
      if(username && password){
        const _user = await userClient.userGetTokens(username)
        setUser(_user)
        console.log("user:", _user)
      }
  },[username,password])

    // Now use the token get obtain an organicationClient with authentication

    // Next use the async orgListCurrentUserOrgs() method on the client instance
    // to return a list of organizations that a user is a member of

    // then make some legit JSON for it and use in the ReactJson below

  return (
    <>
      <label for="username">Username:</label>
      <input type="text" name="username" onBlur={(e) => setUsername(e.target.value)}/>
      <label for="password">Password:</label>
      <input type="password" name="password" onBlur={(e) => setPassword(e.target.value)}/>
      <hr/>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={user}
        theme="monokai"
      />
    </>
  );
}

<Component />
```
