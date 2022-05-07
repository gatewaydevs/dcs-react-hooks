# useExample

@hook-description

```js
import { useExample } from 'styleguidist-template';
import ReactJson from 'react-json-view';

function Component () {
  const {getExample} = useExample();

  const data = getExample();

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data || {}}
        theme="monokai"
      />
    </>
  );
};

<Component />
```