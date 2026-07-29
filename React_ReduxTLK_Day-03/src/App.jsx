import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./features/counterSlice";

const App = () => {
  const dispatch = useDispatch();

  const { counterReducer } = useSelector((state) => state);

  return (
    <div>
      <h1>Count is {counterReducer.count}</h1>
      <button onClick={() => dispatch(decrease())}>Decrease</button>
      <button onClick={() => dispatch(increase())}>Increase</button>
    </div>
  );
};

export default App;
