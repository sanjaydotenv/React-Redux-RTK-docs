# 🚀 Redux

Redux is a **JavaScript library** used for **global state management**. It helps us manage and share application state across multiple components in a predictable and organized way.

Before learning Redux, it's important to understand **why Redux was created**.

---

# 🤔 Why Redux?

In React, we usually manage state using the `useState` hook.

```jsx
const [count, setCount] = useState(0);
```

This works perfectly for **small applications** because the state is only used inside a single component.

For example:

```text
Counter Component
      │
      ▼
 useState()
      │
      ▼
   count = 0
```

Everything is simple.

---

## 📌 The Problem

As the application grows, multiple components may need the same data.

Example:

```text
App
│
├── Navbar
├── Products
├── Cart
└── Profile
```

Suppose the user adds a product to the cart.

Now the following components need the same cart data:

- Navbar (Cart Count)
- Cart Page
- Checkout Page

Without Redux, we pass data through multiple components.

```text
App
 │
 ▼
Layout
 │
 ▼
Products
 │
 ▼
ProductCard
 │
 ▼
Button
```

This process is called **Props Drilling**.

Passing props through many components makes the application difficult to maintain.

---

# 💡 Solution

Redux solves this problem by creating a **single global store**.

Instead of storing important data inside different components, Redux stores it in one central place.

```text
                Redux Store
        ┌─────────────────────────┐
        │                         │
        │   👤 User               │
        │   🛒 Cart               │
        │   ❤️ Wishlist           │
        │   🌙 Theme              │
        │   📦 Products           │
        │                         │
        └─────────────────────────┘
             ▲      ▲      ▲
             │      │      │
        Navbar   Cart   Profile
```

Now every component can access the same data directly from the Store.

No Props Drilling.

---

# 📦 What is Store?

The **Store** is the heart of Redux.

It stores the global state of the application.

Think of it as a **single storage box** where all important application data is kept.

Example State:

```js
{
  user: {
    name: "Mayur",
    email: "mayur@gmail.com"
  },

  cart: [],

  wishlist: [],

  theme: "dark"
}
```

Here,

- `user`
- `cart`
- `wishlist`
- `theme`

are all part of the Redux State.

---

# 🗂 What is State?

State is simply the **current data** of the application.

For example,

```js
{
  count: 0
}
```

or

```js
{
  todos: [],
}
```

The Store contains the State.

Think like this:

```text
Store
   │
   ▼
 State
```

Store = Container

State = Data inside the container.

---

# ⚡ What is an Action?

An **Action** is a plain JavaScript object.

It tells Redux **what should happen**.

Example:

```js
{
    type: "INCREMENT"
}
```

Here,

`type` describes the action.

Sometimes we also send extra information.

```js
{
    type: "ADD_TODO",

    payload: {
        id: 1,
        title: "Learn Redux"
    }
}
```

### Explanation

| Property | Description |
|----------|-------------|
| type | Describes what should happen |
| payload | Additional data required to update the state |

---

# 🧠 What is a Reducer?

A **Reducer** is a JavaScript function.

It receives two parameters.

```js
(state, action)
```

Example

```js
const initialState = {
    count: 0,
};

function counterReducer(state = initialState, action) {

    switch(action.type){

        case "INCREMENT":

            return {
                count: state.count + 1
            };

        default:
            return state;
    }

}
```

## Explanation

### Initial State

```js
const initialState = {
    count: 0,
};
```

This is the default state.

---

### state

The first parameter contains the current Redux State.

Initially,

```js
state = {
    count: 0
}
```

---

### action

The second parameter contains the action object.

Example:

```js
{
    type: "INCREMENT"
}
```

---

### switch(action.type)

The reducer checks the action type.

If the action is

```text
INCREMENT
```

it returns a new state.

```js
return {
    count: state.count + 1
}
```

If no action matches,

```js
return state;
```

The current state is returned unchanged.

---

# 🚫 Never Mutate State

Wrong ❌

```js
state.count++;
```

Correct ✅

```js
return {
    count: state.count + 1
}
```

Redux always expects a **new state**.

---

# 🎯 useSelector()

`useSelector()` is used to read data from the Redux Store.

Example

```jsx
import { useSelector } from "react-redux";

const count = useSelector((state) => state.counter.count);
```

### Explanation

```js
state
```

represents the complete Redux Store.

If the Store looks like this,

```js
{
    counter: {
        count: 5
    }
}
```

Then,

```js
state.counter.count
```

returns

```js
5
```

---

# 🚀 useDispatch()

`useDispatch()` is used to send an Action to Redux.

Example

```jsx
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch({
    type: "INCREMENT"
});
```

### Explanation

`dispatch()` sends the action to the reducer.

The reducer updates the Store.

Finally, React automatically re-renders the component.

---

# 🔄 Complete Redux Flow

Whenever a user interacts with the application, Redux follows the same flow.

```text
User Clicks Button
        │
        ▼
dispatch()
        │
        ▼
Action
        │
        ▼
Reducer
        │
        ▼
Store Updates
        │
        ▼
useSelector()
        │
        ▼
Component Re-renders
```

This flow is the foundation of Redux.

---

# ✅ Advantages of Redux

- Centralized state management.
- Avoids Props Drilling.
- Predictable state updates.
- Easy debugging.
- Better code organization.
- Perfect for medium and large applications.

---

# 📖 Summary

- Redux is a JavaScript library for global state management.
- Store holds the application's global state.
- State is the current application data.
- Actions describe what should happen.
- Reducers update the state based on actions.
- `useSelector()` reads data from the Store.
- `useDispatch()` sends actions to Redux.
- Redux follows a predictable data flow.
