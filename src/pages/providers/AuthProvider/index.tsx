import React, { useReducer, useEffect, useState, FC, PropsWithChildren, useContext } from 'react';
import axios from 'axios';

import {
  loginAction,
} from './actions';
import { IAuthLogin, AuthActionContext, AuthStateContext, AUTH_CONTEXT_INITIAL_STATE, IAuthResponse } from './context';
import { authReducer } from './reducer';

const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_CONTEXT_INITIAL_STATE);
  const [isInprogress, setIsInProgress] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');

  const login = (userInput: IAuthLogin): Promise<IAuthResponse> =>
    new Promise((resolve, reject) => {
      {
        dispatch(loginAction());
        axios.post('https://localhost:44311/api/TokenAuth/Authenticate', userInput)
        .then((response) =>{
          setErrorLogin('');
          setIsInProgress(false)
          resolve(response.data);
        })
        .catch(e => {
          setErrorLogin(e.message);
          alert('Invalid username or password');
        });
      }
    });

    
  //#endregion
  return (
    <AuthStateContext.Provider
      value={{
        ...state,
        isInProgress: { isInprogress },
        error: { errorLogin},
      }}
    >
      <AuthActionContext.Provider
        value={{
          login
        }}
      >
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(AuthStateContext);

  if (context == undefined) {
    throw new Error("'useLibrarianState must be used within a LibrarianProvider'");
  }

  return context;
};

const useActionsContext = () => {
  const context = useContext(AuthStateContext);

  if (context == undefined) {
    throw new Error('useLibrarianActions must be used within a LibrarianProvider');
  }

  return context;
};

const useLogin = () => {
  return { ...useStateContext(), ...useActionsContext() };
};

export { useLogin, AuthProvider };
