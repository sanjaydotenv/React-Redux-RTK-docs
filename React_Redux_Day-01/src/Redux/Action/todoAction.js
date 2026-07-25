export const addTodo = (dets) => {
  return {
    type: "ADD_TODO",
    payload: dets,
  };
};

export const deleteTodo = (dets) => {
  return {
    type: "DELETE_TODO",
    payload: dets,
  };
};
