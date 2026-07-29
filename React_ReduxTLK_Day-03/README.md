# 🚀 React Redux Toolkit

## 📦 Install Redux Toolkit

First, install Redux Toolkit and React Redux.

```bash
npm install @reduxjs/toolkit react-redux
```

---

# 📁 Create the Store

Create a folder named **app** inside the `src` folder.

Inside the `app` folder, create a file named **store.js**.

```jsx
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
```

### 💡 Explanation

- `configureStore()` is used to create the Redux store.
- The `reducer` object will contain all the slices of your application.
- If your project has multiple slices, simply add them inside the `reducer` object.
- Export the store so it can be used throughout the application.

---

# 🌍 Provide Store to the Entire App

To make the Redux store accessible in every component, wrap your application with **Provider**.

```jsx
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 💡 Explanation

- `Provider` comes from **react-redux**.
- It makes the Redux store available to the entire application.
- Pass the store using the `store` prop.
- After this, any component can use Redux hooks like `useSelector()` and `useDispatch()`.

---

# 🗂️ Create a Slice (Reducer)

Inside the `src` folder, create another folder named **features**.

Inside this folder, create a slice file (for example: `counterSlice.js`).

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    count: 0,
  },

  reducers: {
    increase: (state) => {
      state.count += 1;
    },

    decrease: (state) => {
      state.count -= 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;
export default counterSlice.reducer;
```

### 💡 Explanation

Every slice has **3 main properties**:

### 1️⃣ name

- Used to identify the slice.
- Mostly useful while debugging.
- It should be unique.

### 2️⃣ initialState

- Stores the default state of your application.
- Here we created one state named `count` with an initial value of `0`.

### 3️⃣ reducers

- `reducers` is simply an object containing functions.
- These functions update the state.
- In Redux Toolkit, we call these functions **Actions**.
- Every reducer receives two parameters:
  - `state`
  - `action` (optional, used when passing data)

---

# 🛒 Connect Slice to the Store

Now import your slice reducer into the store.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    counterReducer,
  },
});
```

### 💡 Explanation

- Import the reducer from your slice.
- Add it inside the `reducer` object.
- The key (`counterReducer`) becomes the name used inside the Redux state.

---

# 🎯 Using Redux in Components

Now you can access and update the Redux state inside any component.

```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./features/counterSlice";

const App = () => {
  const dispatch = useDispatch();

  const { counterReducer } = useSelector((state) => state);

  return (
    <div>
      <h1>Count is {counterReducer.count}</h1>

      <button onClick={() => dispatch(decrease())}>
        Decrease
      </button>

      <button onClick={() => dispatch(increase())}>
        Increase
      </button>
    </div>
  );
};

export default App;
```

### 💡 Explanation

### `useDispatch()`

- Used to send actions to Redux.
- Whenever you want to update the state, call `dispatch()`.

```jsx
dispatch(increase());
dispatch(decrease());
```

---

### `useSelector()`

- Used to read data from the Redux store.
- It gives you access to the current state.

```jsx
const { counterReducer } = useSelector((state) => state);
```

Here,

- `state` is the complete Redux store.
- `counterReducer` is the reducer name we added inside the store.
- We can access the value using:

```jsx
counterReducer.count
```

---

# ✅ Flow of Redux Toolkit

```text
User Clicks Button
        │
        ▼
dispatch(action)
        │
        ▼
Reducer Runs
        │
        ▼
State Updates
        │
        ▼
Store Updates
        │
        ▼
useSelector() Gets New State
        │
        ▼
Component Re-renders
```

---

# 🎉 That's It!

Now you know how Redux Toolkit works:

- ✅ Create Store
- ✅ Wrap App with Provider
- ✅ Create Slice
- ✅ Connect Slice to Store
- ✅ Read State using `useSelector()`
- ✅ Update State using `useDispatch()`