const initialState = {
  todoContainer: [],
};

export const todoReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === "ADD_TODO") {
    return { todoContainer: [...state.todoContainer, action.payload] };
  } else if (action.type === "DELETE_TODO") {
    const updated = state.todoContainer.filter((todos, index) => {
      return action.payload !== index;
    });
    return { todoContainer: updated };
  } else {
    return state;
  }
};
