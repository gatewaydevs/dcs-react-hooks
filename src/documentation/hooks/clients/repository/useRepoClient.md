# useRepoClient

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useRepoClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const repoClient = useRepoClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(repoClient);
    
    const [repository, setRepository] = useState({});
    
    useEffect(async () => {
      setRepository(await repoClient.repoGet('Es-419_gl', 'es-419_tn').then(({ data }) => data))
    },[])
    
    return (
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={repository}
        theme="monokai"
      />
    );
}

<Component />
```
