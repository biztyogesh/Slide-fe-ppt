import {
  AUTH_ACTION, CURRENT_USER_ACTION, LOGOUT_ACTION
} from 'store/actions';
import { StandardAction , DEFAULT_INITIAL_ACTION_STATE,} from "../common"

export interface IUser {
  email: string;
  role: "Admin" | "User";
}

export interface IAuthState {
  isAuthenticated: boolean;
  token: string;
  user: IUser;
  fetching: boolean;
  fetchingUser: boolean;
  message: string;
  error: boolean;
}

const INITIAL_STATE: IAuthState = {
  isAuthenticated: false,
  token: localStorage.getItem("token")!,
  user: undefined!,
  fetching: false,
  fetchingUser: false,
  message: undefined!,
  error: false
};

const authReducer = (
  state: IAuthState = INITIAL_STATE,
  action: StandardAction = DEFAULT_INITIAL_ACTION_STATE,
): IAuthState => {
  const { type, payload } = action;
  if (type === AUTH_ACTION.REQUEST) {
    return { ...INITIAL_STATE, fetching: true };
  } else if (type === CURRENT_USER_ACTION.REQUEST) {
    return { ...INITIAL_STATE, fetchingUser: true };
  } else if(type === AUTH_ACTION.SUCCESS) {
    return { ...state, fetching: false, fetchingUser: false, token: payload.token, user: payload.user, isAuthenticated: true};
  } else if(type === AUTH_ACTION.FAILURE || type === CURRENT_USER_ACTION.FAILURE) {
    return { ...state, fetching: false, fetchingUser: false, user: undefined!, error: true, token: undefined!, isAuthenticated: false, message: payload.message};
  } else if(type === CURRENT_USER_ACTION.SUCCESS) {
    return { ...state, fetchingUser: false, user: payload.user, isAuthenticated: true};
  } else if(type === LOGOUT_ACTION) {
    return { ...INITIAL_STATE };
  } else {
    return state;
  }
};

export default authReducer;
