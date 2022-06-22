### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useIssueClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const issueClient = useIssueClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(issueClient);
    
    const [issues, setIssues] = useState({});
    
    useEffect(async () => {
      setIssues(await issueClient.issueListIssues('unfoldingWord', 'en_ta').then(({ data }) => data))
    },[])
    
    return (
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={issues}
        theme="monokai"
      />
    );
}

<Component />
```
