---
title: Full Stack JavaScript Application Build Part 4 Phase 1 - Database Access and Authentication
description: Part 4 of a series about how to build a full stack JavaScript application. This article is about database access and user authentication on the backend. The frontend implementation of user auth will be covered in phase 2 of Part 4.
abstract:
date: 2020-09-24 7:00:00.00
tags:
  - software
  - tutorial
  - javascript
  - fullstack
  - koa
  - react
layout: layouts/post.njk
---

## Introduction

Welcome to Part 4: Phase 2 - the final part - of the Full Stack Application series. In this second phase of part 4, we'll be implementing the user authentication to the frontend of the application. The implementation will be simplistic and form a foundation for building a more robust authentication mechanism.

<p class="info">  I feel it's warranted to state that the build is intended to provide you with a good base for developing full stack JavaScript applications, but you will need to do some additional learning in order to get this application really production ready.
</p>

**_The final project source can be found in this [GitHub repo](https://github.com/nathanhumphrey/simple-isomorphic-app/tree/frontend)_**

### Roadmap

The build is divided into a four-part series:

1. [Routes and pages](/posts/2020-02-06-full-stack-javascript-app-build-pt-1/)
2. [Building components](/posts/2020-02-12-full-stack-javascript-app-pt-2/)
3. [Styling components](/posts/2020-03-24-full-stack-javascript-app-pt-3/)
4. Database access and authentication
   1. [Backend implementation](/posts/2020-04-06-full-stack-javascript-app-pt-4-phase1/)
   2. [Frontend implementation](/posts/2020-09-24-full-stack-javascript-app-pt-4-phase2/) ⇐ you are here

### Update client components

Now that we have an operational API, we need some way of hooking into it from the frontend (pun intended). The first task in front of us is to update the client components to work with the API. Asynchronous requests must be sent and received by the client, and the state of the UI must be updated appropriately. To ease the sending and receiving of data, let's build a simple `userClient` specifically for managing user interaction (e.g. sign up, sign in, etc.) on the site.

To support async requests, let's update our application to support async on the client side:

<code class="term">npm i --save-dev @babel/plugin-transform-runtime</code>

The `@babel/plugin-transform-runtime` package will provide the async runtime environment for the client, we just need to configure its use in `webpack.config.js`.

```js/7
...

rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
});

...

```

<p class="caption">update babel config - webpack.config.js</p>

<p class="info">NOTE: You may also want to make djustments to the <code>server/routes.js</code>, which currently returns text and not JSON for failed/unauthenticated requests.</p>

Finally, let's create `src/app/components/User/user-client.js` for our database access abstraction:

```js
const getData = async (url = '', data = {}) => {
  return await (
    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // !! required to store the cookie from the response
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
  ).json();
};

const postData = async (url = '', data = {}) => {
  return await (
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
  ).json();
};

const userSignin = async (user) => {
  return await postData('/api/signin', user);
};

const userSignout = async () => {
  return await getData('/api/signout');
};

const userSignup = async (user) => {
  return await postData('/api/signup', user);
};

const userView = async (user) => {
  return await getData(`/api/users/${user.id}`);
};

const userClient = { userSignin, userSignout, userSignup, userView };

export { userClient };
```

<p class="caption">user API access - src/app/components/User/user-client.js</p>

The `user-client.js` file essentially wraps up the requests as they were presented in [phase 1](/posts/2020-04-06-full-stack-javascript-app-pt-4-phase1/) of part 4.

#### Managing Client State

To start, let's create some top-level state for the application so that we can store user details (e.g. currently signed in id). For this example, I'm going to use a [context](https://reactjs.org/docs/context.html) and a [reducer](https://reactjs.org/docs/hooks-reference.html#usereducer), but you could probably get away with just using state. The nice thing about working with a context is that we won't have to pass a mutator function between all the various components that need to know if a user is signed in or not.

Create the context and custom provider in `src/app/components/User/user-context.js` for a custom user context/provider object for the entire app:

```js
import React from 'react';
import { userClient } from './user-client';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'signin': {
      return { user: { ...state } };
    }

    case 'signout': {
      return { user: null };
    }

    case 'signup': {
      return { user: { ...state } };
    }

    case 'view': {
      return { user: { ...state } };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, { user: null });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);

  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }

  return context;
}

const userSignin = async (dispatch, creds) => {
  try {
    const user = await userClient.userSignin(creds);
    dispatch({ type: 'signup', user });
  } catch (error) {
    dispatch({ type: 'fail signin', error });
  }
};

const userSignup = async (dispatch, userDetails) => {
  try {
    const user = await userClient.userSignup(userDetails);
    dispatch({ type: 'signup', user });
  } catch (error) {
    dispatch({ type: 'fail signup', error });
  }
};

const userSignout = async (dispatch) => {
  try {
    const user = await userClient.userSignout();
    dispatch({ type: 'signout', user: null });
  } catch (error) {
    dispatch({ type: 'fail signout', error });
  }
};

const userView = async (dispatch, userId) => {
  try {
    const user = await userClient.userView({ id: userId });
    dispatch({ type: 'view', user });
  } catch (error) {
    dispatch({ type: 'fail view', error });
  }
};

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  userSignin,
  userSignout,
  userSignup,
  userView,
};
```

<p class="caption">context and provider for user management - src/app/components/User/user-context.js</p>

The pattern used for this custom context and provider was provided by [Kent Dodds](https://kentcdodds.com/blog/how-to-use-react-context-effectively). There are two key components here, one is the state context and the other is the dispatch context. Separating these two allows for just makin use of one or the other (depending on circumstances) and provides a nice separation of concerns. The implementation here is, again, quite simplistic, but serves as an easier to understand foundation for learning the basics.

Now that we have a provider, we need to put it to use. We can wrap the entire application in our new provider to allow access to user management from anywhere in the application without the need for passing down props. Make the following updates to `src/app/App.js` that will ensure access throughout the application the `UserProvider`:

```js/6,16
...

import { UserProvider } from './components/User/user-context';

const App = () => {
  return (
    <UserProvider>
      <Switch>
        {routes
          .filter((route) => route.page)
          .map((route) => (
            <Route exact={route.exact} key={route.page} path={route.path}>
              {pages[route.page]}
            </Route>
          ))}
      </Switch>
    </UserProvider>
  );

...

```

<p class="caption">implement the UserProvider for the application - src/app/App.js</p>

We should now have access to the user management functions throughout the application! Time to update the components.

#### User Signup

A good place to begin the implementation is the sign up form. We can test the creation of a new user account and get a feel for how to work with the user management functions we created earlier. We can update the `UserSignUpForm` to sign up a user on submit of the form, and display a link directing user to sign in, if successful.

The sign up flow is fairly stratight forward with no bells or whistles. Feel free to modify the flow to enhance the user experience in whatever ways you like (e.g. use a toast popup, automatically redirect to another page, etc.). For the sign up process, we will need access to the user dispatch and user sign up function, which can be achieved by importing `useUserDispatch` and `userSignup` from our context. We can then make a call to `userSignup` when the form is submitted and add a conditional check to our render to update the user when the signup is completed (or there was an error, which I'm simply logging to the console at this time). Make the following updates to `src/app/components/User/UserSignUpForm/UserSignUpForm.js`:

```js/2,6-24,27-31,35
...

import { useUserDispatch, userSignup } from '../user-context';

const UserSignUpForm = () => {
  ...
  const [isSignedUp, setIsSignedUp] = useState(false);

  const userDispatch = useUserDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    //TODO: form validation (or in the state set functions)
    try {
      await userSignup(userDispatch, {
        firstName,
        lastName,
        email,
        password,
      });
      setIsSignedUp(true);
    } catch (error) {
      console.error(`There was a problem: ${error}`);
    }
  };

  return (
    <>
      {isSignedUp ? (
        <div>Thanks for signing up. Sign in with the form above.</div>
      ) : (
        <form className='sign-up-form' onSubmit={handleSubmit}>
          ...
        </form>
      )}
    </>

...

```

<p class="caption">use the user management functions to sign up a new user - src/app/components/User/UserSignUpForm/UserSignUpForm.js</p>

Now, a user can sign up for an account via the form, sweet! Time to sign in.

#### User Signin

Work on the sign in. Wrap the SignInForm component in UserContext and display the form when not signed in and a sign out link when signed in.

Sign in form must submit to api/signin and use UserContext to update the signed in user state

#### Main Navigation

On the home page, we want to hide the sign-up link if the user is already signed in. We should also replace the sign-in form with a signout button if the user has already signed in. The previous changes will affect the PageNav component, so not really the home page, but that's our entry to the application so that's where we'll first see the effects.

top nav needs some way of updating based on the signed in user's id ... don't know about this yet
--> just wrap Nav in UserContext and add if/else to the .map() call - (replace users/**:id** with correct user id value)

clicking sign out link should call api/signout and then redirect to home page

#### User Account View

account component should be wrapped in UserContext:

- If user id == params id, then display
- If user id != params id, then display not found or redirect to home page
- If no user signed in, direct to sign in form

## Conclusion
