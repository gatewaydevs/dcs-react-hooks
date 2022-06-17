# useUserOrgs

**First**: login using the `useAuthentication` demo

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useUserOrgs } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state, actions } = useUserOrgs({ });

  const { orgList, isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={orgList}
        theme="monokai"
      />
    </>
  );
}

<Component />
```
