import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementAction,
  incrementAction,
  increaseBy,
} from "../Redux/Action/counterAction";

const IncrementDecrement = () => {
  const inpRef = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log();
  const handleIncrement = () => {
    dispatch(incrementAction());
  };
  const handleDecrement = () => {
    dispatch(decrementAction());
  };
  const handleIncreaseBy = () => {
    const val = inpRef.current.value;
    dispatch(increaseBy(val));
    inpRef.current.value = "";
  };

  return (
    <div className="gap-10 p-5 bg-gray-100  flex flex-col items-center">
      <h1 className="bg-gray-300 rounded-sm px-3 py-1 w-fit items-center">
        Count :- {state.incrementReducer.count}
      </h1>
      <div className="flex gap-5">
        <button
          onClick={handleIncrement}
          className="bg-green-500 px-3 rounded py-1 hover:bg-green-600 font-semibold"
        >
          Increase
        </button>
        <button
          onClick={handleDecrement}
          className="bg-red-500 px-3 rounded py-1 hover:bg-red-600 font-semibold"
        >
          Decrease
        </button>
        <input
          ref={inpRef}
          className="border rounded-xl px-4"
          type="text"
          placeholder="Increase By"
        />
        <button onClick={handleIncreaseBy}>submit</button>
      </div>
    </div>
  );
};

export default IncrementDecrement;
