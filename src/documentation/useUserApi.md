# useUserApi

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useUserApi } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const userClient = useUserApi({basePath: "https://qa.door43.org/api/v1/"});
    console.log(userClient);

    const [user, setUser] = useState({});

    useEffect(async () => {
       setUser(await userClient.userGet("unfoldingWord"))
    },[])

    return (
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={user}
        theme="monokai"
      />
    );
}

<Component />
```

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
        setUser(await userClient.userGetTokens(username))
      }
  },[username,password])

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" onBlur={(e) => setUsername(e.target.value)}/>
      <label htmlFor="password">Password:</label>
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
