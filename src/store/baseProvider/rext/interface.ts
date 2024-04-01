import { Reducer, Action } from 'redux';
import { RequestType } from '../../common';

export interface ActionIdentity {
  REXT_FETCH: RequestType;
  REXT_UPDATE: RequestType;
  REXT_MULTI_FETCH: RequestType;
  REXT_MULTI_UPDATE_FETCH: RequestType;
  RESET_UPDATE_STATE: string;
}

export type IRextActionDefinition = (
  params: IRextParams,
  overrideMetsKeys?: IOverrideRextKeys,
  resources?: any,
) => IRextAction;
export type IRextResetActionDefinition = () => IRextAction;
export type IRextMultiActionDefinition = (
  params: IRextParams[],
  resources?: any,
) => IRextAction;

export interface IRextActionCreators {
  request: IRextActionDefinition;
  update: IRextActionDefinition;
  multiRequest: IRextMultiActionDefinition;
  multiUpdate: IRextMultiActionDefinition;
  resetUpdate: IRextResetActionDefinition;
}

export interface IRextMeta {
  uniqueKey?: string;
  keys: IRextKeys;
  actions: RequestType;
}
export interface IRextKeys {
  identity: string;
  transformation?: any;
  getBaseUrl: (state: any) => string;
  getToken: (state: any) => string;
  getXAPIToken?: (state: any) => string;
  maintainOldValues?: boolean;
}

export interface IOverrideRextKeys {
  transformation?: any;
}

export interface IRextParams {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  queryParams?: { [key: string]: string | number | boolean };
  urlParams?: { [key: string]: string | number };
  body?: any;
  headers?: Headers;
  multiIdentity?: string;
}
export interface IRextAction extends Action {
  meta: IRextMeta;
  payload: {
    params?: IRextParams | IRextParams[];
    resources?: any;
    items?: any;
    message?: string;
    error?: boolean;
  };
}
/**
 * Reducers
 */
export interface IRextInfo {
  params?: IRextParams | IRextParams[];
  fetching?: boolean;
  isUpdated?: boolean;
  hasError?: boolean;
  message?: string;
  isCancelled: boolean;
}

export interface RextResourcesReducer {
  [key: string]: any;
}

export interface IRextReducer {
  info: IRextInfo;
  resources: any;
  items: any;
}
export interface IRext extends IRextActionCreators {
  reducers: Reducer<IRextReducer, IRextAction>;
  saga: any;
}
/**
 * Selector
 */
export interface IRextState {
  params: IRextParams | IRextParams[];

  fetching?: boolean;
  isUpdated?: boolean;

  resources: any;
  data: any;

  error: boolean;
  message: string;
}
