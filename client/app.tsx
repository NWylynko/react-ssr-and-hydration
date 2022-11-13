// this gets imported by both react ssr and hydration, it both gets server side rendered and then client rendered a second later
// so this code needs to work both in node and the browser :)

import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #161925;
    color: #FAF6F6;
    font-family: 'Dongle', sans-serif;
  }

  button {
    font-family: 'Dongle', sans-serif;
  }
`;

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Counter />
    </>
  );
};

// A custom hook to manage a number
const useCount = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => setCount((n) => n + 1);
  const decrement = () => setCount((n) => n - 1);
  const reset = () => setCount(initialCount);
  const add = (amount: number) => setCount((n) => n + amount);
  const remove = (amount: number) => setCount((n) => n - amount);

  return { count, increment, decrement, reset, add, remove };
};

// Our component with state that the user can fiddle with
const Counter = () => {
  const { count, increment, decrement } = useCount(100);

  return (
    <Container>
      <div>
        <Title>this is the count: {count}</Title>
      </div>
      <div>
        <Button onClick={increment} color="green">
          Add
        </Button>
        <Button onClick={decrement} color="red">
          Sub
        </Button>
      </div>
    </Container>
  );
};

const Title = styled.h1`
  margin: 0;
`;

const Button = styled.button<{ color: string }>`
  border: 2px solid ${(props) => props.color};
  border-radius: 4px;
  padding: 4px 24px;
  margin: 4px;
  font-size: 24px;
  color: ${(props) => props.color};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
`;
