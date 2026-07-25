export const incrementAction = () => {
  return {
    type: "INCREMENT",
    payload: "",
  };
};

export const decrementAction = () => {
  return {
    type: "DECREMENT",
    payload: "",
  };
};

export const increaseBy = (dets) => {
  console.log("This is a dets -> ", dets)
  return {
    type: "INCREASEBY",
    payload: dets,
  };
};
