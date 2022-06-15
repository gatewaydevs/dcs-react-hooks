# useOrgApi

```js
import React, { useEffect, useState } from 'react';
import { useOrgApi } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const orgClient = useOrgApi({ basePath: "https://qa.door43.org/api/v1/" });
    console.log("orgClient:", orgClient)
    const [org, setOrg] = useState({});
    useEffect(async () => {
      setOrg(await orgClient.orgGet('unfoldingword').then(({ data }) => data))
    },[])
    return (
      <>
        <ReactJson
          style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
          src={org}
          theme="monokai"
        />
      </>
    );
}

<Component />
```
