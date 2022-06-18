# useRepoClient

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useRepoClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const repositoryClient = useRepoClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(repositoryClient);
    
    const [repository, setRepository] = useState({});
    
    useEffect(async () => {
      setRepository(await repositoryClient.repoGet('Es-419_gl', 'es-419_tn').then(({ data }) => data))
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
