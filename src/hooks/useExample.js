import { useEffect, useState } from "react";
import { example } from "../helpers/example";

export default function useExample() {
  const [ exampleState, setExampleState ] = useState('');

  useEffect(() => {
    setExampleState( 'Hello world' );
  }, []);

  const getExample = () => example(exampleState);
  
  return { getExample, exampleState, setExampleState };
}