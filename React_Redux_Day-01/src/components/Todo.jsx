import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../Redux/Action/todoAction";

const Todo = () => {
  const inpRef = useRef();

  const dispatch = useDispatch();
  const { todoReducer } = useSelector((state) => state);

  console.log(todoReducer)

  const handleAddTodo = () => {
    const val = inpRef.current.value;
    if (!val) return;
    dispatch(addTodo(val));
    inpRef.current.value = "";
  };

  const deleteHandler = (idx) => {
    dispatch(deleteTodo(idx))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Redux Todo App</h1>

        {/* Input */}
        <div className="flex gap-3 mb-6">
          <input
            ref={inpRef}
            type="text"
            placeholder="Enter your task..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {/* Single Todo */}

          {todoReducer.todoContainer.map((todos , idx) => {
            return (
              <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3">
                <p className="font-medium">{todos}</p>

                <div className="flex gap-2">

                  <button onClick={() => deleteHandler(idx)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
