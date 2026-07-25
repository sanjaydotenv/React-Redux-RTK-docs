const initialState = {
  count: 0,
};

export const incrementReducer = (state = initialState, action) => {
  if (action.type === "INCREMENT") {
    return { count: state.count + 1 };
  } else if (action.type === "DECREMENT") {
    if (state.count > 0) {
      return { count: state.count - 1 };
    }

    return state;
  } else if (action.type === "INCREASEBY") {
    console.log("chal raha hai");
    return { count: state.count + Number(action.payload) };
  } else {
    return state;
  }
};
