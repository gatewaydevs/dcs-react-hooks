# useUserOrganization

**Steps:**
1. First, login using the `useAuthentication` demo
2. Second, after successful login, click the "Set Organization" button

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useUserOrganization } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [organizationName, setOrganizationName] = useState();
  const [username, setUsername] = useState("tc01");

  const { state, actions } = useUserOrganization({
    organizationName,
    username,
  });

  const { orgList, isLoading } = state;

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
        src={orgList}
        theme="monokai"
      />
      <button onClick={setOrgParams}>Set Organization</button>
      <button onClick={unsetOrgParams}>Unset Organization</button>
    </>
  );
}

<Component />
```
