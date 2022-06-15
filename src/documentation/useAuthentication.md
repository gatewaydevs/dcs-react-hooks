@hook-description

### Examples

```js
import React, { useEffect, useState } from 'react';
import { useAuthentication } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const tokenName = "dcs-react-hooks-playground"

  const {state,actions} = useAuthentication({tokenName, username, password});
  console.log(state);

  return (
    <>
      <label for="username">Username:</label>
      <input type="text" name="username" onBlur={(e) => setUsername(e.target.value)}/>
      <label for="password">Password:</label>
      <input type="password" name="password" onBlur={(e) => setPassword(e.target.value)}/>
      <hr/>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={state}
        theme="monokai"
      />
    </>
  );
}

<Component />
```
