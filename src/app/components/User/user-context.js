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
