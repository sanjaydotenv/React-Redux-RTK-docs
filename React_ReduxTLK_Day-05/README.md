# 🔐 React Authentication with Redux Toolkit, Protected Routes & State Hydration

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple?logo=redux"/>
  <img src="https://img.shields.io/badge/React%20Router-Protected%20Routes-red?logo=reactrouter"/>
  <img src="https://img.shields.io/badge/LocalStorage-State%20Persistence-success"/>
</p>

> A beginner-friendly authentication flow built using **React**, **Redux Toolkit**, **React Router**, and **LocalStorage**. This project demonstrates how authentication works, how protected routes are implemented, and how to keep users logged in even after refreshing the page using **State Hydration**.

---

# 📚 Topics Covered

- ✅ React Router
- ✅ Redux Toolkit
- ✅ Authentication Flow
- ✅ Protected Routes
- ✅ Public Routes
- ✅ LocalStorage
- ✅ State Hydration
- ✅ Login & Registration Logic
- ✅ Redux Store
- ✅ Route Protection

---

# 📂 Folder Structure

```text
src
│
├── app
│   └── store.jsx
│
├── features
│   └── AuthSlice.jsx
│
├── hook
│   └── AuthHook.jsx
│
├── layout
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
│
├── page
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── HomePage.jsx
│
├── routes
│   ├── ProtectedRoutes
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   └── AppRoutes.jsx
│
└── App.jsx
```

---

# 🔥 Authentication Flow

```text
             Register User
                    │
                    ▼
      Save User into LocalStorage
                    │
                    ▼
               Login Page
                    │
                    ▼
        Verify Email & Password
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
   Invalid User             Valid User
        │                       │
        ▼                       ▼
  Error Toast          Save Logged User
                              │
                              ▼
                 Dispatch Redux Action
                              │
                              ▼
                    Navigate to Main
```

---

# 🗄 Redux Store

Redux Toolkit is responsible for managing the authentication state of the application.

Instead of passing data from component to component, Redux keeps the authenticated user in a global store.

Example:

```jsx
const initialState = {
    user: null,
    isAuthenticate: false
}
```

When user logs in:

```jsx
dispatch(loginUser(user))
```

Redux updates

```jsx
user
```

and

```jsx
isAuthenticate
```

---

# 🧠 Auth Slice

The Auth Slice contains reducers responsible for updating authentication state.

Example:

```jsx
loginUser: (state, action) => {
    state.user = action.payload
    state.isAuthenticate = true
}
```

Whenever

```jsx
dispatch(loginUser(user))
```

is called,

Redux automatically updates the global state.

---

# 💾 Why LocalStorage?

Redux state is temporary.

Whenever we refresh the browser,

Redux state becomes

```jsx
null
```

because Redux exists only in memory.

Example

Before Refresh

```text
Redux
│
└── User Logged In ✅
```

After Refresh

```text
Redux
│
└── user = null ❌
```

That is why we save the logged-in user inside LocalStorage.

```jsx
localStorage.setItem(
    "loggedInUser",
    JSON.stringify(user)
)
```

LocalStorage survives browser refresh.

---

# 🚀 What is State Hydration?

State Hydration means restoring Redux state from LocalStorage when the application starts.

Instead of forcing the user to login again,

we simply restore the previous login.

Flow:

```text
Application Starts
        │
        ▼
Read LocalStorage
        │
        ▼
User Found?
    │
 ┌──┴───────┐
 │          │
No         Yes
 │          │
 ▼          ▼
Login     Dispatch Login
Page      Action
             │
             ▼
      Redux Updated
```

---

# 💡 Hydration Example

```jsx
const hydrate = () => {

    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    )

    if(loggedInUser){
        dispatch(loginUser(loggedInUser))
    }

}
```

Run only once

```jsx
useEffect(() => {
    hydrate()
}, [])
```

Now Redux will automatically recover previous authentication.

---

# 🔒 Protected Routes

Protected Routes are routes that require authentication.

Example

```
/main
/dashboard
/profile
/settings
```

Only logged-in users can visit these pages.

Example

```jsx
const PrivateRoute = () => {

    const { user } = useSelector(
        state => state.auth
    )

    return user
        ? <Outlet />
        : <Navigate to="/" />

}
```

Logic

```text
User Logged In?
      │
 ┌────┴─────┐
 │          │
Yes        No
 │          │
 ▼          ▼
Outlet   Login Page
```

---

# 🌐 Public Routes

Public Routes are pages accessible only before login.

Example

```
/
register
forgot-password
```

If user is already logged in,

he should not visit Login Page again.

Example

```jsx
const PublicRoute = () => {

    const { user } = useSelector(
        state => state.auth
    )

    return user
        ? <Navigate to="/main"/>
        : <Outlet/>

}
```

Logic

```text
Already Logged In?
        │
 ┌──────┴──────┐
 │             │
Yes           No
 │             │
 ▼             ▼
Main        Login Page
```

---

# 🧩 Complete Route Flow

```text
                Browser Opens
                      │
                      ▼
               AppRoutes Render
                      │
                      ▼
          Read LocalStorage User
                      │
                      ▼
              Dispatch Login Action
                      │
                      ▼
          Redux Authentication Ready
                      │
          ┌───────────┴────────────┐
          │                        │
          ▼                        ▼
      Public Route            Private Route
          │                        │
          ▼                        ▼
 Login/Register             Main Application
```

---

# ⚙ Login Flow

```text
User Enters Email
          │
          ▼
User Enters Password
          │
          ▼
Compare With Registered Users
          │
    ┌─────┴─────────┐
    │               │
    ▼               ▼
Invalid          Valid
    │               │
Toast          Save User
                  │
                  ▼
         LocalStorage
                  │
                  ▼
       Dispatch Login Action
                  │
                  ▼
          Navigate to Main
```

---

# 📦 Why Redux?

Redux provides

- Global State Management
- Predictable State
- Easy Authentication Handling
- Centralized User Information
- Better Scalability

Instead of passing props,

every component can access

```jsx
const { user } = useSelector(
    state => state.auth
)
```

---

# 🎯 Key Concepts Learned

✅ Redux Toolkit

✅ createSlice()

✅ configureStore()

✅ useDispatch()

✅ useSelector()

✅ React Router

✅ Navigate

✅ Outlet

✅ LocalStorage

✅ Authentication

✅ Protected Routes

✅ Public Routes

✅ State Hydration

✅ Global State

---

# 🧠 Conclusion

This project demonstrates how a real-world authentication system works using **React**, **Redux Toolkit**, **React Router**, and **LocalStorage**.

The authentication state is managed globally with Redux, persisted using LocalStorage, and automatically restored through **State Hydration** whenever the application reloads.

By combining **Protected Routes**, **Public Routes**, and **Redux State Management**, users enjoy a seamless login experience while ensuring that private pages remain secure and accessible only to authenticated users.

This project serves as a strong foundation for understanding modern authentication patterns used in real-world React applications.