# useRepoApi

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useRepoApi } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const repositoryClient = useRepoApi();
    const [repository, setRepository] = useState({});
    useEffect(() => {
      setRepo(repositoryClient.repoGet('Es-419_gl', 'es-419_tn').then(({ data }) => data));
    },[])

    return (
      <>
        <ReactJson
          style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
          src={repository}
          theme="monokai"
        />
      </>
    );
}

<Component />
```
