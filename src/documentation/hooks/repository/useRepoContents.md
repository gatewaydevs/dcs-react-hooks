### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useRepoContents } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){

  const { state, actions } = useRepoContents({
    ownerName: "unfoldingWord",
    repoName: "en_tn",
    filepath: "en_tn_65-3JN.tsv",
    ref: "master",
    raw: false
  });

  const { isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={state}
        theme="monokai"
      />
    </>
  );
}

<Component />
```
