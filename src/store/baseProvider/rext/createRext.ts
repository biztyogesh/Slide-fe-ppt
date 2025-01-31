import { combineReducers, Reducer } from 'redux';
import { infoReducer, itemsReducer, resourcesReducer } from './reducer';
import {
  rextActionFunctions,
  resetUpdateAction,
  createIdentityAction,
} from './actions';
import {
  IRextKeys,
  IRextActionCreators,
  IRextParams,
  IRextAction,
  IRextInfo,
  IRext,
  ActionIdentity,
  IOverrideRextKeys,
} from './interface';
import { defaultRextInfo } from './defautState';
import createSagaEvent from './saga';

export const getRextActionCreators = (
  keys: IRextKeys,
  actionidentity: ActionIdentity,
): IRextActionCreators => {
  return {
    request: (
      params: IRextParams,
      overrideMetsKeys?: IOverrideRextKeys,
      resources?: any,
    ) =>
      rextActionFunctions.request(
        {
          actions: actionidentity.REXT_FETCH,
          keys: { ...keys, ...overrideMetsKeys },
        },
        params,
        resources,
      ),
    update: (
      params: IRextParams,
      overrideMetsKeys?: IOverrideRextKeys,
      resources?: any,
    ) =>
      rextActionFunctions.request(
        {
          actions: actionidentity.REXT_UPDATE,
          keys: { ...keys, ...overrideMetsKeys },
        },
        params,
        resources,
      ),
    multiRequest: (params: IRextParams[], resources?: any) =>
      rextActionFunctions.request(
        { actions: actionidentity.REXT_MULTI_FETCH, keys },
        params,
        resources,
      ),
    multiUpdate: (params: IRextParams[], resources?: any) =>
      rextActionFunctions.request(
        { actions: actionidentity.REXT_MULTI_UPDATE_FETCH, keys },
        params,
        resources,
      ),
    resetUpdate: () =>
      resetUpdateAction(actionidentity.RESET_UPDATE_STATE, {
        actions: actionidentity.REXT_UPDATE,
        keys,
      }),
  };
};
export const rext = (
  items: Reducer<any, IRextAction>,
  info: Reducer<IRextInfo, IRextAction>,
  resources: Reducer<any, IRextAction>,
  requestRextActionCreators: IRextActionCreators,
  saga: any,
): IRext => ({
  reducers: combineReducers({
    info,
    items,
    resources,
  }),
  ...requestRextActionCreators,
  saga,
});
export const createRext = (keys: IRextKeys): IRext => {
  const { identity } = keys;
  const actionidentity = createIdentityAction(identity);
  const info = infoReducer(actionidentity, defaultRextInfo);
  const items = itemsReducer(actionidentity);
  const resources = resourcesReducer(actionidentity);
  const rextActionCreators = getRextActionCreators(keys, actionidentity);
  const sagaEvent = createSagaEvent(actionidentity);
  return rext(items, info, resources, rextActionCreators, sagaEvent);
};
