import { createAction } from "redux-actions";
import { IStateContext } from "./context";

export enum AuthActions {
    USER_LOGIN = "USER_LOGIN",
}

export const loginAction = createAction<IStateContext>(
    AuthActions.USER_LOGIN,
  () => ({})
);