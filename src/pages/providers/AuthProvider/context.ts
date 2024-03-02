import { createContext } from 'react';

export interface IAuthLogin {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: string;
}

export interface IAuthResponse {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  };
  targetUrl: null | string;
  success: boolean;
  error: null | string;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}


export interface IStateContext {
  auth?: IAuthLogin;
  isInProgress?: any;
  error?: any;
}

export interface IActionContext {
  login: (auth: IAuthLogin)  => Promise<IAuthResponse>;
}

export const AUTH_CONTEXT_INITIAL_STATE: IStateContext = {};

export const AuthStateContext = createContext<IStateContext>(AUTH_CONTEXT_INITIAL_STATE);

export const AuthActionContext = createContext<IActionContext>({} as any);
