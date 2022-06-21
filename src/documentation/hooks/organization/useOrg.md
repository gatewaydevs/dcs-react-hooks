### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useOrg } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [orgName, setOrgName] = useState();

  const { state, actions } = useOrg({
    orgName
  });

  const { org, isLoading } = state;

  const unsetOrgParams = () => {
    setOrgName(null);
  }

  const setOrgParams = () => {
    setOrgName("unfoldingword");
  }

  return isLoading ? "loading..." : (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={org}
        theme="monokai"
      />
      <button onClick={setOrgParams}>Set Organization</button>
      <button onClick={unsetOrgParams}>Unset Organization</button>
    </>
  );
}

<Component />
```
