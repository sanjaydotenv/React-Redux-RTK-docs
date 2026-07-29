# React Redux-Tollkit

- sabse pahle install karo redux tooklit `npm i @reduxjs/toolkit react-redux`

- uske baad ek achhe folder structure ke liye app naam ka folder create karo

- uske ander ek store naam se file bna lo

- ab us store file ke ander store bna lo

```jsx
// sabse pahale import karo store ko configureStore name se
import { configureStore } from "@reduxjs/toolkit";

// uske baad uska ek variavle me rakh ko or jo import kiya hai store usko call callkarke obect me reducers bna do or uske bhi obect open kardo taki multiples reducers aa sake or ***imp*** isko export kar jarur dena

export const store = configureStore({
  reducers: {},
});
```

- ab is store ko pure app me provide karne ke liye hame provider bana padega o ki hame milega react-redux k tarhaf se taki redux-toolkit ka use kar paye communcation ke liye

```jsx
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>,
);
```

- ab ye pure app me accessable hai

- ab ek src ke ander hi folder bnao fatures naam se reducers create karne ke liye isnhe ham slice bhi kehete hai reducers ko

- fir uske baad feature me reducers create karo

```jsx
// sabse pahle import karlo slice ko 
import { createSlice } from "@reduxjs/toolkit";

// uske baad ek variable me rakh lo or slice ke ander 3 chij aati ha ifirast is name (optional) scond initialState jaja ham hamri states rakhte hai and last thirs is reducers jo ki jada kuchh nahi ek object ke nader fucntion hote hai but ye redux toolkit ke fucntion hai to normal function nahi hote wese to ham inhe action bolte hai or inske peremeter me o chije aati hai first is state o hamne banayi hai or second is action jo ferform karna hai bass

const counterSlice = createSlice({
  name: "Counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increaseCount: () => {},
    decreaseCount: () => {},
  },

});
```
