# ⚡ Redux Thunk — Complete Guide

> **"Thunk is a middleware that allows Redux to execute asynchronous logic (API calls, timers, async tasks) before updating the store."**

---

# 📌 What is Thunk?

By default, **Redux can only dispatch plain JavaScript objects.**

```js
dispatch({
    type: "LOGIN"
})
```

But in real applications, we don't immediately have the data.

Example:

* Login API
* Register API
* Fetch Products
* Fetch User Profile
* Upload Image
* Delete Data

These operations take time.

So before dispatching the final action, we need to perform some asynchronous work.

This is exactly why **Thunk** exists.

---

# 🤔 Why Do We Need Thunk?

Imagine a Login Process.

Without Thunk:

```
Button Click
      │
      ▼
Dispatch Login
      │
      ▼
Store Updated
```

But...

Where will the API call happen?

Redux reducers cannot call APIs because reducers must always stay **pure**.

Therefore we need something between

```
Component
      │
      ▼
API Call
      │
      ▼
Dispatch Success / Error
      │
      ▼
Reducer
      │
      ▼
Store
```

That middle layer is **Thunk**.

---

# 🚫 Problem Without Thunk

Suppose we write

```js
dispatch({
    type: "LOGIN_SUCCESS",
    payload: user
})
```

Where does `user` come from?

It first has to be fetched from the server.

Example:

```js
const user = await axios.post("/login");
```

But reducers cannot write

```js
await axios.post(...)
```

because reducers must be

* Pure
* Synchronous
* No Side Effects

Hence...

**Thunk handles all asynchronous work.**

---

# 🧠 What is Middleware?

Middleware sits between

```
Dispatch
    │
    ▼
Middleware
    │
    ▼
Reducer
```

It can

* Call APIs
* Wait for Promises
* Read State
* Dispatch Multiple Actions
* Handle Errors
* Execute Async Logic

Thunk is one of Redux's middleware.

---

# 🔥 What is createAsyncThunk?

Redux Toolkit provides

```js
createAsyncThunk()
```

which automatically creates

* Pending Action
* Fulfilled Action
* Rejected Action

You don't need to manually write three separate actions.

---

# 🧩 Syntax

```js
createAsyncThunk(
    "actionName",
    async (argument, thunkAPI) => {
        // async work
    }
)
```

---

# Parameters

```js
createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {

    }
)
```

### First Parameter

```js
"auth/login"
```

This is the action type.

Redux automatically generates

```
auth/login/pending

auth/login/fulfilled

auth/login/rejected
```

---

### Second Parameter

```js
async (credentials, thunkAPI) => {

}
```

This is the async function.

Inside it you can

* Call API
* Use await
* Read State
* Dispatch Actions
* Return Data
* Reject Errors

---

# Example

```js
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials) => {

        const res = await axios.post("/login", credentials);

        return res.data;
    }
);
```

---

# What Happens Internally?

Suppose the user clicks Login.

```
dispatch(loginUser(data))
```

Redux Toolkit automatically does

```
LOGIN
   │
   ▼
Pending

(API Running)

   │
   ▼
Fulfilled

OR

Rejected
```

No manual action creators are required.

---

# Pending State

Runs immediately after dispatch.

```js
builder.addCase(loginUser.pending, (state) => {

    state.loading = true;

});
```

Usually used for

* Loading Spinner
* Disable Button
* Progress Bar

---

# Fulfilled State

Runs when API succeeds.

```js
builder.addCase(loginUser.fulfilled, (state, action) => {

    state.loading = false;

    state.user = action.payload;

});
```

Here

```
action.payload
```

contains

```js
return res.data;
```

---

# Rejected State

Runs if API fails.

```js
builder.addCase(loginUser.rejected, (state) => {

    state.loading = false;

    state.error = true;

});
```

---

# Complete Flow

```
Button Click

      │

dispatch(login())

      │

createAsyncThunk()

      │

Pending

      │

API Request

      │

───────────────
Success
───────────────

Fulfilled

      │

Reducer

      │

Store Updated

      │

UI Re-render



OR



───────────────
Failure
───────────────

Rejected

      │

Reducer

      │

Store Updated

      │

Show Error
```

---

# Understanding thunkAPI

Inside

```js
async (_, thunkAPI)
```

Redux Toolkit gives an object called

```js
thunkAPI
```

It contains useful methods.

---

## dispatch()

Dispatch another action.

```js
thunkAPI.dispatch(logout())
```

---

## getState()

Read current Redux state.

```js
const state = thunkAPI.getState();

console.log(state.auth.user);
```

---

## rejectWithValue()

Return a custom error.

```js
return thunkAPI.rejectWithValue(
    "Invalid Credentials"
);
```

Instead of

```js
throw error;
```

This allows custom error messages.

---

# Login Example

```js
export const loginUser = createAsyncThunk(

    "auth/login",

    async (credentials, thunkAPI) => {

        try {

            const res = await axios.post(
                "/login",
                credentials
            );

            return res.data;

        }

        catch {

            return thunkAPI.rejectWithValue(
                "Login Failed"
            );

        }

    }

);
```

---

# Slice Example

```js
extraReducers: (builder) => {

    builder

        .addCase(loginUser.pending, (state) => {

            state.loading = true;

        })

        .addCase(loginUser.fulfilled, (state, action) => {

            state.loading = false;

            state.user = action.payload;

        })

        .addCase(loginUser.rejected, (state) => {

            state.loading = false;

        });

}
```

---

# Dispatching Thunk

Inside a component

```js
dispatch(
    loginUser({
        email,
        password
    })
);
```

You don't dispatch

```js
dispatch({
    type: "LOGIN_SUCCESS"
});
```

Redux Toolkit handles that automatically.

---

# Real Project Examples

✅ Login

```js
dispatch(loginUser(credentials));
```

---

✅ Register

```js
dispatch(registerUser(data));
```

---

✅ Get Products

```js
dispatch(fetchProducts());
```

---

✅ Get User Profile

```js
dispatch(fetchProfile());
```

---

✅ Delete Product

```js
dispatch(deleteProduct(id));
```

---

# Your Example (Hydrate User)

```js
export const hydrateUserAction =
createAsyncThunk(

    "auth/hydrate",

    async (_, thunkAPI) => {

        const token =
        localStorage.getItem("accessToken");

        try {

            const res = await axios.get(
                "/auth/me",
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            return res.data;

        }

        catch {

            return thunkAPI.rejectWithValue(
                "Unauthorized"
            );

        }

    }

);
```

After a page refresh, this thunk checks if a saved token exists, fetches the logged-in user's details, and restores the authentication state without requiring the user to log in again.

---

# Advantages of Thunk

* ✅ Handles asynchronous operations cleanly.
* ✅ Keeps reducers pure and predictable.
* ✅ Automatically creates pending, fulfilled, and rejected actions with `createAsyncThunk`.
* ✅ Makes API calls easy to manage.
* ✅ Supports error handling with `rejectWithValue`.
* ✅ Allows access to `dispatch` and `getState`.
* ✅ Reduces boilerplate compared to traditional Redux.

---

# Limitations

* ❌ Best suited for simple to medium async logic.
* ❌ Complex workflows may become difficult to manage.
* ❌ Not ideal for advanced features like caching, polling, or request deduplication (libraries like RTK Query are often a better fit).

---

# 📚 Summary

```
Component
     │
     ▼
dispatch(thunk)
     │
     ▼
createAsyncThunk()
     │
     ├────────► Pending
     │
     ▼
API Call
     │
     ├────────► Success
     │              │
     │              ▼
     │         Fulfilled
     │
     └────────► Failure
                    │
                    ▼
               Rejected
                    │
                    ▼
             extraReducers
                    │
                    ▼
              Redux Store
                    │
                    ▼
              React UI Updates
```

> **In short:** Redux Thunk is a middleware that lets you perform asynchronous work before updating the Redux store. With Redux Toolkit's `createAsyncThunk`, handling API calls becomes much simpler because it automatically manages the `pending`, `fulfilled`, and `rejected` action lifecycle.
