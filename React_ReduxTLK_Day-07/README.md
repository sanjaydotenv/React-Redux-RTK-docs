# 🚀 TanStack Query — Pagination & Infinite Scrolling

A practical project to understand how **API fetching, Pagination, and Infinite Scrolling** work with React and **TanStack Query**.

This project demonstrates the same product API using three different approaches:

* 🟢 Normal API Fetching with React
* 🔵 Pagination with TanStack Query
* 🟣 Infinite Scrolling with TanStack Query

---

## 📌 Table of Contents

* [What is Server State?](#-what-is-server-state)
* [What is Pagination?](#-what-is-pagination)
* [What is Infinite Scrolling?](#-what-is-infinite-scrolling)
* [Normal API Fetching](#-1-normal-api-fetching-with-react)
* [Problems with Normal API Fetching](#-2-problems-with-normal-api-fetching)
* [What is TanStack Query?](#-3-what-is-tanstack-query)
* [Pagination with TanStack Query](#-4-pagination-with-tanstack-query)
* [How Pagination Works](#-5-how-pagination-works)
* [queryKey](#-6-querykey)
* [queryFn](#-7-queryfn)
* [keepPreviousData](#-8-keeppreviousdata)
* [Infinite Scrolling](#-9-infinite-scrolling)
* [useInfiniteQuery](#-10-useinfinitequery)
* [pageParam](#-11-pageparam)
* [getNextPageParam](#-12-getnextpageparam)
* [fetchNextPage](#-13-fetchnextpage)
* [hasNextPage](#-14-hasnextpage)
* [isFetchingNextPage](#-15-isfetchingnextpage)
* [data.pages](#-16-datapages)
* [Scroll Detection](#-17-scroll-detection)
* [Complete Infinite Scroll Flow](#-18-complete-infinite-scroll-flow)
* [Pagination vs Infinite Scrolling](#-19-pagination-vs-infinite-scrolling)
* [Final Mental Model](#-20-final-mental-model)
* [Key Takeaways](#-21-key-takeaways)

---

# 🧠 What is Server State?

Before understanding TanStack Query, we should understand **Server State**.

Server State is data that comes from a backend server or API.

For example:

```text
Products
Users
Posts
Comments
Orders
Messages
```

Example API:

```text
Client
   ↓
API Request
   ↓
Backend / Server
   ↓
Database
   ↓
Response
   ↓
React Application
```

The data coming from the server is called **Server State**.

---

# 📄 What is Pagination?

Imagine an API contains **1000 products**.

If we request all 1000 products at once:

```text
API
 ↓
1000 Products
 ↓
Browser
```

This can create unnecessary work.

Instead, we divide the data into smaller groups.

For example:

```text
Page 1 → Products 1 - 10
Page 2 → Products 11 - 20
Page 3 → Products 21 - 30
Page 4 → Products 31 - 40
...
```

This technique is called **Pagination**.

### Simple Definition

> Pagination means dividing a large amount of data into smaller pages and loading one page at a time.

---

## 📚 Real World Example

Think about a book.

Instead of reading all 500 pages at once:

```text
Page 1
Page 2
Page 3
...
Page 500
```

You read one page at a time.

API pagination works in a similar way.

```text
Products
────────────────────────

Page 1
🛍️ 1
🛍️ 2
🛍️ 3
...
🛍️ 10

Page 2
🛍️ 11
🛍️ 12
...
🛍️ 20
```

---

# 🔘 Pagination UI

The most common pagination UI looks like this:

```text
        Products

[ Product Grid ]

      Page 2 of 20

[ Prev ]          [ Next ]
```

The user clicks:

```text
Next
 ↓
Page 3
 ↓
API Request
 ↓
Page 3 Products
```

The previous page is normally replaced by the new page.

---

# ♾️ What is Infinite Scrolling?

Infinite Scrolling is another way to load large amounts of data.

Instead of showing:

```text
Page 1
Page 2
Page 3
```

with buttons, the application automatically loads more data when the user gets near the bottom.

Example:

```text
Products 1 - 10

        ↓ Scroll

Products 11 - 20

        ↓ Scroll

Products 21 - 30

        ↓ Scroll

Products 31 - 40
```

### Simple Definition

> Infinite scrolling means automatically loading more data when the user reaches near the bottom of the page.

---

# 📱 Real World Examples

You can see infinite scrolling in applications like:

```text
Instagram
YouTube
Facebook
Twitter / X
Pinterest
```

For example:

```text
User opens feed
      ↓
Load 10 posts
      ↓
User scrolls
      ↓
Load 10 more posts
      ↓
User scrolls
      ↓
Load 10 more posts
```

The old posts remain visible.

---

# ⚔️ Pagination vs Infinite Scrolling

### Pagination

```text
Page 1
   ↓
Click Next
   ↓
Page 2
   ↓
Click Next
   ↓
Page 3
```

Usually:

```text
Old page → replaced
New page → displayed
```

### Infinite Scrolling

```text
Page 1
   ↓
Scroll
   ↓
Page 2
   ↓
Scroll
   ↓
Page 3
```

Here:

```text
Old data
   +
New data
   ↓
Combined list
```

---

# 🟢 1. Normal API Fetching with React

Before using TanStack Query, we can fetch data using React's built-in hooks.

The basic approach is:

```text
useState
   ↓
useEffect
   ↓
API Request
   ↓
Response
   ↓
setState
   ↓
Re-render
```

Example:

```js
const [productData, setProductData] = useState([]);

const getData = async () => {
  const products = await getProducts(limit, page);

  setProductData(products);
};

useEffect(() => {
  getData();
}, [page]);
```

Whenever `page` changes:

```text
page changes
     ↓
useEffect runs
     ↓
API request
     ↓
setProductData()
     ↓
Component re-renders
```

---

# ⚠️ 2. Problems with Normal API Fetching

The normal approach works perfectly fine for small applications.

But as the application grows, we have to manually handle many things.

For example:

```text
Loading State
Error State
Caching
Refetching
Pagination
Previous Data
Duplicate Requests
Background Updates
Server State
```

We may end up writing:

```js
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

And then manually write logic for:

```text
try
catch
loading
error
refetch
cache
pagination
```

This is where **TanStack Query** becomes useful.

---

# 🔵 3. What is TanStack Query?

TanStack Query is a library for managing **server state**.

It provides tools for:

* API fetching
* Caching
* Loading states
* Error handling
* Refetching
* Pagination
* Infinite scrolling
* Background updates
* Request management

Instead of manually managing everything, we tell TanStack Query:

```text
What data do I need?
        +
How should I fetch it?
```

TanStack Query manages the server-state lifecycle for us.

---

# 🔄 TanStack Query Basic Flow

```text
Component
    ↓
useQuery()
    ↓
queryKey
    ↓
queryFn
    ↓
API
    ↓
Response
    ↓
TanStack Query Cache
    ↓
Component
```

---

# 🔵 4. Pagination with TanStack Query

For normal pagination we use:

```js
useQuery()
```

Example:

```js
const {
  data,
  isPending,
  error,
  isPlaceholderData
} = useQuery({
  queryKey: ["products", page],

  queryFn: () => {
    return getProducts(limit, page);
  },

  placeholderData: keepPreviousData,
});
```

Here we have two important things:

```text
queryKey
queryFn
```

---

# 🏷️ 5. queryKey

`queryKey` identifies the query.

Example:

```js
queryKey: ["products"]
```

This means:

```text
This query belongs to products.
```

For pagination:

```js
queryKey: ["products", page]
```

Now every page gets a different query key.

```text
["products", 1]
["products", 2]
["products", 3]
["products", 4]
```

TanStack Query can identify these as different queries and manage their cached data separately.

---

# 🔑 6. queryFn

`queryFn` tells TanStack Query how to fetch the data.

Example:

```js
queryFn: () => {
  return getProducts(limit, page);
}
```

So the flow is:

```text
queryKey
    ↓
Identify Query

queryFn
    ↓
Fetch Data

getProducts()
    ↓
API

Response
    ↓
TanStack Query
```

---

# 🔢 7. How Pagination Works

Suppose:

```js
limit = 10;
page = 1;
```

TanStack Query uses:

```text
["products", 1]
```

The API returns:

```text
Products 1 - 10
```

When the user clicks Next:

```js
setPage(page + 1);
```

Now:

```text
page = 2
```

The query key becomes:

```text
["products", 2]
```

TanStack Query sees that the query has changed and fetches the data for page 2.

```text
Page 1
   ↓
["products", 1]
   ↓
API
   ↓
Products 1-10

        ↓ Next

Page 2
   ↓
["products", 2]
   ↓
API
   ↓
Products 11-20
```

---

# ✨ 8. keepPreviousData

During pagination, we don't always want the UI to become empty while the next page is loading.

TanStack Query provides:

```js
placeholderData: keepPreviousData
```

This keeps the previous data visible while the new data is being fetched.

Example:

```text
Current Page
     ↓
Page 1 Products

User clicks Next
     ↓
Page 2 Request
     ↓
Page 1 still visible
     ↓
Page 2 arrives
     ↓
Page 2 displayed
```

We can detect this state using:

```js
isPlaceholderData
```

For example:

```jsx
<div
  style={{
    opacity: isPlaceholderData ? 0.3 : 1
  }}
>
```

This can make the UI look slightly faded while new data is loading.

---

# 📊 9. Calculating Total Pages

Suppose API returns:

```js
{
  products: [...],
  total: 194
}
```

And:

```js
limit = 10;
```

We calculate:

```js
const pages = Math.ceil(data.total / limit);
```

Calculation:

```text
194 / 10
= 19.4

Math.ceil(19.4)
= 20
```

Therefore:

```text
Total Pages = 20
```

---

# 🟣 10. Infinite Scrolling

For infinite scrolling we use:

```js
useInfiniteQuery()
```

Unlike normal pagination, we don't replace the old data.

Instead:

```text
Page 1
   +
Page 2
   +
Page 3
   +
Page 4
```

All pages remain available.

---

# 🧩 11. useInfiniteQuery

Basic structure:

```js
const {
  data,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteQuery({
  queryKey: ["products"],

  queryFn: ({ pageParam }) => {
    return getProducts(limit, pageParam);
  },

  initialPageParam: 0,

  getNextPageParam: (lastPage, allPages) => {

    const loadedData = allPages.length * limit;

    if (loadedData < lastPage.total) {
      return loadedData;
    }

    return undefined;
  },
});
```

There are some important concepts here:

```text
queryKey
queryFn
initialPageParam
pageParam
getNextPageParam
fetchNextPage
hasNextPage
isFetchingNextPage
data.pages
```

---

# 🎯 12. initialPageParam

We start with:

```js
initialPageParam: 0
```

This means the first request starts with:

```text
pageParam = 0
```

So:

```js
getProducts(limit, pageParam);
```

becomes:

```js
getProducts(10, 0);
```

---

# 🔢 13. pageParam

`pageParam` tells us which portion of data should be fetched.

Example:

```js
queryFn: ({ pageParam }) => {
  return getProducts(limit, pageParam);
}
```

Requests can look like:

```text
First Request
limit = 10
skip = 0

Second Request
limit = 10
skip = 10

Third Request
limit = 10
skip = 20

Fourth Request
limit = 10
skip = 30
```

So:

```text
pageParam
    ↓
Tells API where to start fetching
```

---

# 🧠 14. getNextPageParam

This is one of the most important parts of `useInfiniteQuery`.

It answers one question:

> "What should the next page parameter be?"

Example:

```js
getNextPageParam: (lastPage, allPages) => {

  const loadedData = allPages.length * limit;

  if (loadedData < lastPage.total) {
    return loadedData;
  }

  return undefined;
}
```

---

# 📦 15. allPages

`allPages` contains all pages that have already been loaded.

After first request:

```js
allPages = [
  page1
];
```

After second request:

```js
allPages = [
  page1,
  page2
];
```

After third request:

```js
allPages = [
  page1,
  page2,
  page3
];
```

Therefore:

```js
allPages.length
```

tells us how many pages have been loaded.

---

# 📈 16. loadedData

We calculate:

```js
const loadedData = allPages.length * limit;
```

Suppose:

```text
limit = 10
```

Then:

```text
1 page × 10 = 10 products

2 pages × 10 = 20 products

3 pages × 10 = 30 products
```

So `loadedData` tells us how much data has approximately been loaded.

---

# 📦 17. lastPage

`lastPage` represents the latest API response.

Example:

```js
{
  products: [...],
  total: 194
}
```

Therefore:

```js
lastPage.total
```

gives:

```text
194
```

---

# 🔍 18. Checking for More Data

We check:

```js
if (loadedData < lastPage.total) {
  return loadedData;
}
```

Example:

```text
Loaded Data = 30
Total Data  = 194
```

Because:

```text
30 < 194
```

there is still more data.

So:

```js
return 30;
```

TanStack Query uses `30` as the next `pageParam`.

The next request becomes:

```js
getProducts(10, 30);
```

---

# 🛑 19. Why return undefined?

When all data has been loaded:

```js
return undefined;
```

TanStack Query understands:

```text
There is no next page.
```

Therefore:

```js
hasNextPage
```

becomes:

```text
false
```

---

# ⏭️ 20. fetchNextPage

`fetchNextPage()` tells TanStack Query:

> Fetch the next page.

Example:

```js
fetchNextPage();
```

Flow:

```text
fetchNextPage()
      ↓
getNextPageParam()
      ↓
Next pageParam
      ↓
queryFn()
      ↓
API
      ↓
New Page
      ↓
data.pages
```

---

# ❓ 21. hasNextPage

`hasNextPage` tells us whether more data is available.

```js
hasNextPage
```

If:

```text
More data exists
```

then:

```text
true
```

If:

```text
Everything has been loaded
```

then:

```text
false
```

We can use:

```js
if (hasNextPage) {
  fetchNextPage();
}
```

---

# ⏳ 22. isFetchingNextPage

This tells us whether the next page is currently loading.

```js
isFetchingNextPage
```

When request is running:

```text
true
```

When request finishes:

```text
false
```

We can prevent duplicate requests:

```js
if (hasNextPage && !isFetchingNextPage) {
  fetchNextPage();
}
```

Meaning:

```text
More data exists
      +
No request is currently running
      ↓
Fetch next page
```

---

# 📚 23. data.pages

With `useInfiniteQuery`, the response is stored inside:

```js
data.pages
```

Example:

```js
data.pages = [
  {
    products: [...]
  },

  {
    products: [...]
  },

  {
    products: [...]
  }
];
```

Each object represents one API response/page.

---

# 🔗 24. Combining All Products

Because products are stored page by page, we combine them using:

```js
const allProducts = data.pages.flatMap(
  (page) => page.products
);
```

Example:

```text
Page 1
[1,2,3]

Page 2
[4,5,6]

Page 3
[7,8,9]
```

After `flatMap()`:

```text
[1,2,3,4,5,6,7,8,9]
```

Now we can render:

```js
allProducts.map(...)
```

---

# 🖱️ 25. Scroll Detection

Now we need to detect when the user is near the bottom.

We listen for the browser's scroll event:

```js
window.addEventListener("scroll", trackScroll);
```

Inside the function:

```js
const scrollTop = window.scrollY;

const windowHeight = window.innerHeight;

const documentHeight =
  document.documentElement.scrollHeight;
```

---

# 📏 26. Understanding Scroll Values

### `scrollTop`

How far the user has already scrolled.

```text
scrollTop = current scroll position
```

### `windowHeight`

Height of the visible browser window.

```text
windowHeight = visible screen height
```

### `documentHeight`

Total height of the webpage.

```text
documentHeight = complete page height
```

---

# 🎯 27. Detecting Near Bottom

We use:

```js
const nearBottom =
  scrollTop + windowHeight >= documentHeight - 200;
```

Why `200`?

Because we don't want to wait until the exact bottom.

We want to start loading slightly before the user reaches the bottom.

Example:

```text
Page Height = 2200px

Bottom Trigger = 200px before bottom

2200 - 200
= 2000
```

If:

```text
scrollTop + windowHeight >= 2000
```

then:

```text
nearBottom = true
```

---

# 🚀 28. Triggering Next Page

Now we combine all conditions:

```js
if (
  nearBottom &&
  hasNextPage &&
  !isFetchingNextPage
) {
  fetchNextPage();
}
```

This means:

```text
User is near bottom
        ↓
More data exists?
        ↓
YES
        ↓
Already fetching?
        ↓
NO
        ↓
fetchNextPage()
```

And the next products are loaded.

---

# ♻️ 29. useEffect for Scroll Listener

We attach the scroll event inside `useEffect`:

```js
useEffect(() => {

  const trackScroll = () => {

    const scrollTop = window.scrollY;

    const windowHeight = window.innerHeight;

    const documentHeight =
      document.documentElement.scrollHeight;

    const nearBottom =
      scrollTop + windowHeight >=
      documentHeight - 200;

    if (
      nearBottom &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  window.addEventListener(
    "scroll",
    trackScroll
  );

  return () => {
    window.removeEventListener(
      "scroll",
      trackScroll
    );
  };

}, [
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
]);
```

The cleanup function is important because it removes the event listener when the component is unmounted.

---

# 🔥 30. Complete Infinite Scroll Flow

This is the most important flow to understand:

```text
                USER OPENS PAGE
                       ↓
                useInfiniteQuery()
                       ↓
              initialPageParam = 0
                       ↓
              queryFn({ pageParam })
                       ↓
                 API REQUEST
                       ↓
                 Products 1-10
                       ↓
                  data.pages
                       ↓
                 Render Products
                       ↓
                USER SCROLLS
                       ↓
                Near Bottom?
                  ↙       ↘
                NO         YES
                            ↓
                     hasNextPage?
                       ↙       ↘
                     NO         YES
                                  ↓
                         isFetchingNextPage?
                            ↙        ↘
                          YES         NO
                                      ↓
                              fetchNextPage()
                                      ↓
                            getNextPageParam()
                                      ↓
                               next pageParam
                                      ↓
                                  queryFn()
                                      ↓
                                  API
                                      ↓
                              New Products
                                      ↓
                               data.pages
                                      ↓
                                  flatMap()
                                      ↓
                              Render All Products
```

Then the same process repeats until:

```text
hasNextPage = false
```

---

# ⚔️ 31. Pagination vs Infinite Scrolling

| Feature           | Pagination                 | Infinite Scrolling   |
| ----------------- | -------------------------- | -------------------- |
| Hook              | `useQuery`                 | `useInfiniteQuery`   |
| Navigation        | Prev / Next                | Scroll               |
| Data              | Current page               | Multiple pages       |
| Old data          | Usually replaced           | Remains visible      |
| Page control      | `useState`                 | `pageParam`          |
| Next request      | Change page                | `fetchNextPage()`    |
| Next page logic   | Manual                     | `getNextPageParam()` |
| More data         | Manual                     | `hasNextPage`        |
| Loading next page | Custom state / query state | `isFetchingNextPage` |
| Stored pages      | Single query result        | `data.pages`         |

---

# 🧩 32. Normal React vs TanStack Query

## Without TanStack Query

```text
useState
   ↓
useEffect
   ↓
API
   ↓
setState
   ↓
Loading
   ↓
Error
   ↓
Caching
   ↓
Pagination
   ↓
Manual Management
```

---

## With TanStack Query

```text
useQuery()
   ↓
queryKey
   ↓
queryFn
   ↓
TanStack Query
   ↓
Cache
   ↓
Loading
   ↓
Error
   ↓
Refetch
   ↓
Server State Management
```

---

# 🧠 33. The Most Important Mental Model

Remember these concepts:

```text
useQuery
   ↓
Normal Server Data
```

```text
queryKey
   ↓
Identifies the Query
```

```text
queryFn
   ↓
Fetches the Data
```

```text
useInfiniteQuery
   ↓
Multiple Pages
```

```text
pageParam
   ↓
Tells API what portion to fetch
```

```text
getNextPageParam
   ↓
Decides the next pageParam
```

```text
fetchNextPage
   ↓
Fetches the next page
```

```text
hasNextPage
   ↓
Checks if more data exists
```

```text
isFetchingNextPage
   ↓
Checks if next page is loading
```

```text
data.pages
   ↓
Contains all fetched pages
```

```text
flatMap()
   ↓
Combines all page data
```

---

# 🗺️ 34. Complete Architecture

### Normal React

```text
┌──────────────┐
│   Component  │
└──────┬───────┘
       ↓
┌──────────────┐
│  useEffect   │
└──────┬───────┘
       ↓
┌──────────────┐
│     API      │
└──────┬───────┘
       ↓
┌──────────────┐
│   useState   │
└──────────────┘
```

### TanStack Pagination

```text
┌──────────────┐
│   Component  │
└──────┬───────┘
       ↓
┌──────────────┐
│   useQuery   │
└──────┬───────┘
       ↓
┌──────────────┐
│  queryKey    │
│  queryFn     │
└──────┬───────┘
       ↓
┌──────────────┐
│     API      │
└──────┬───────┘
       ↓
┌──────────────┐
│ TanStack     │
│ Query Cache  │
└──────────────┘
```

### TanStack Infinite Query

```text
┌────────────────────┐
│     Component      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ useInfiniteQuery() │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│     pageParam      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│      queryFn       │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│        API         │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│     data.pages     │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│      flatMap()     │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│   All Products     │
└────────────────────┘
```

---

# 📚 35. Key Takeaways

### Pagination

> Pagination divides large data into smaller pages and allows users to move between those pages.

```text
Page 1 → Page 2 → Page 3
```

### Infinite Scrolling

> Infinite scrolling automatically loads more data when the user reaches near the bottom.

```text
Page 1
  ↓
Scroll
  ↓
Page 2
  ↓
Scroll
  ↓
Page 3
```

### TanStack Query

> TanStack Query helps manage server state and handles things like fetching, caching, loading, errors, refetching, pagination and infinite queries.

### `useQuery`

Used for normal queries and pagination.

```js
useQuery()
```

### `useInfiniteQuery`

Used for infinite scrolling and multiple pages.

```js
useInfiniteQuery()
```

### Most Important Infinite Query Flow

```text
useInfiniteQuery()
        ↓
initialPageParam
        ↓
queryFn()
        ↓
API
        ↓
data.pages
        ↓
User Scrolls
        ↓
fetchNextPage()
        ↓
getNextPageParam()
        ↓
Next pageParam
        ↓
queryFn()
        ↓
API
        ↓
New Page
        ↓
data.pages
```

---

# 🏁 Conclusion

This project helped understand how API data can be handled in three different ways.

### 1️⃣ Normal React

```text
useState + useEffect
```

Good for understanding the basics of API fetching.

### 2️⃣ TanStack Query Pagination

```text
useQuery()
+
queryKey
+
page
```

Useful when the UI has:

```text
Prev
Next
Page 1
Page 2
Page 3
```

### 3️⃣ TanStack Query Infinite Scrolling

```text
useInfiniteQuery()
+
pageParam
+
getNextPageParam()
+
fetchNextPage()
```

Useful when the application should continuously load more data while the user scrolls.

The main idea is simple:

```text
             SERVER DATA
                  │
        ┌─────────┴─────────┐
        ↓                   ↓
   PAGINATION        INFINITE SCROLL
        ↓                   ↓
   useQuery()       useInfiniteQuery()
        ↓                   ↓
   page state          pageParam
        ↓                   ↓
   Next / Prev        fetchNextPage()
                            ↓
                     data.pages
                            ↓
                         flatMap()
                            ↓
                      All Products
```

---

## 🚀 What I Learned

Through this project, I learned:

* How API pagination works
* What pagination actually means
* What infinite scrolling means
* Difference between pagination and infinite scrolling
* Server state vs client state
* `useQuery`
* `useInfiniteQuery`
* `queryKey`
* `queryFn`
* `pageParam`
* `initialPageParam`
* `getNextPageParam`
* `fetchNextPage`
* `hasNextPage`
* `isFetchingNextPage`
* `data.pages`
* `keepPreviousData`
* Scroll event handling
* Combining paginated API responses with `flatMap()`
* How TanStack Query manages server state
