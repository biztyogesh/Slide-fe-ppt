import {
  IRextParams,
  ActionIdentity,
  IRextAction,
  IRextMeta,
} from './interface';
import { defineRequestType } from '../../common';

export function createIdentityAction(identity: string): ActionIdentity {
  return {
    REXT_FETCH: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_FETCH`),
    REXT_UPDATE: defineRequestType(`@${identity}CUSTOM_REDUX_REXT_UPDATE`),
    REXT_MULTI_FETCH: defineRequestType(
      `@${identity}CUSTOM_REDUX_REXT_MULTI_FETCH`,
    ),
    REXT_MULTI_UPDATE_FETCH: defineRequestType(
      `@${identity}CUSTOM_REDUX_REXT_MULTI_UPDATE_FETCH`,
    ),
    RESET_UPDATE_STATE: `@${identity}CUSTOM_REDUX_REXT_RESET_UPDATE`,
  };
}

export const rextActionFunctions = {
  request: (
    meta: IRextMeta,
    params: IRextParams | IRextParams[],
    resources?: any,
  ): IRextAction => {
    const { actions } = meta;
    return {
      type: actions.REQUEST,
      meta,
      payload: {
        params,
        resources,
      },
    };
  },
  success: (
    meta: IRextMeta,
    params: IRextParams | IRextParams[],
    items: any,
    message: string,
  ): IRextAction => {
    const { actions } = meta;
    return {
      type: actions.SUCCESS,
      meta,
      payload: {
        params,
        items,
        message,
      },
    };
  },
  failure: (
    meta: IRextMeta,
    params: IRextParams | IRextParams[],
    message: string,
  ): IRextAction => {
    const { actions } = meta;
    return {
      type: actions.FAILURE,
      meta,
      payload: {
        params,
        message,
      },
    };
  },
};

export function resetUpdateAction(
  identity: string,
  meta: IRextMeta,
): IRextAction {
  return {
    type: identity,
    meta,
    payload: {},
  };
}
