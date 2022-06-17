# useAllOrganizations

@hook-description

```js
import React, { useEffect, useState } from 'react';
import { useAllOrganizations } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state, actions } = useAllOrganizations({});

  const { organizations, isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={organizations}
        theme="monokai"
      />
    </>
  );
}

<Component />
```
