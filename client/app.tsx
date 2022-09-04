// this gets imported by both react ssr and hydration, it both gets server side rendered and then client rendered a second later
// so this code needs to work both in node and the browser :)

import React, { useState } from "react";
import styled from "styled-components";

export const App = () => {
  return <Counter />;
};

// A custom hook to manage a number
const useCount = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => setCount((n) => n + 1);
  const decrement = () => setCount((n) => n - 1);

  return { count, increment, decrement };
};

// Our component with state that the user can fiddle with
const Counter = () => {
  const { count, increment, decrement } = useCount(100);

  return (
    <>
      <div>
        <span>this is the count: {count}</span>
      </div>
      <div>
        <Button onClick={increment}>Add</Button>
        <Button onClick={decrement}>Sub</Button>
      </div>
    </>
  );
};

const Button = styled.button`
  border: 2px solid black;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 4px;
`;
