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
