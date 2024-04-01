import { RequestType, StandardAction, defineRequestType } from '../common';

export const AUTH_ACTION: RequestType =  defineRequestType(`AUTH_ACTION`);
export const CURRENT_USER_ACTION =  defineRequestType(`CURRENT_USER_ACTION`);
export const LOGOUT_ACTION =  "LOGOUT_ACTION";



export const requestLogin = (payload: any): StandardAction => {
  return {
    type: AUTH_ACTION.REQUEST,
    payload,
  };
};


export const requestUserDetail = (): StandardAction => {
  return {
    type: CURRENT_USER_ACTION.REQUEST,
    payload: {},
  };
};

export const requestLogout = (): StandardAction => {
  return {
    type: LOGOUT_ACTION,
    payload: {},
  };
};
