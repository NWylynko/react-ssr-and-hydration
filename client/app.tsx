// this gets imported by both react ssr and hydration, it both gets server side rendered and then client rendered a second later
// so this code needs to work both in node and the browser :)

import React, { useState } from "react";
import type { PropsWithChildren } from "react";

export const App = () => {
  return (
    <Document>
      {/* I have built a counter as an example,
      feel free to replace it with whatever you feel like */}
      <Counter />
    </Document>
  );
};

const Document = ({ children }: PropsWithChildren) => {
  return (
    <>
      <head>
        {/* here we need to include the javascript bundle
        so the browser downloads it. */}
        <script src={`./static/main.js`} type="module" />
      </head>
      <body>{children}</body>
    </>
  );
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
        <button onClick={increment}>Add</button>
        <button onClick={decrement}>Sub</button>
      </div>
    </>
  );
};
