# useOrg

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useOrg } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [organizationName, setOrganizationName] = useState();

  const { state, actions } = useOrg({
    organizationName
  });

  const { organization, isLoading } = state;

  const unsetOrgParams = () => {
    setOrganizationName(null);
  }

  const setOrgParams = () => {
    setOrganizationName("unfoldingword");
  }

  return isLoading ? "loading..." : (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={organization}
        theme="monokai"
      />
      <button onClick={setOrgParams}>Set Organization</button>
      <button onClick={unsetOrgParams}>Unset Organization</button>
    </>
  );
}

<Component />
```
