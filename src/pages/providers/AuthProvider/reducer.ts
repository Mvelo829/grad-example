import { AuthActions } from './actions';
import { IStateContext } from './context';

export function authReducer(state: IStateContext, action: ReduxActions.Action<IStateContext>) {
  const { type, payload } = action;

  switch (type) {
    case AuthActions.USER_LOGIN:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}