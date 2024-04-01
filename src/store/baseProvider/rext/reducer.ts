import { defaultRextAction } from './defautState';
import {
  IRextAction,
  RextResourcesReducer,
  IRextInfo,
  IRextKeys,
  IRextParams,
  ActionIdentity,
} from './interface';

export const infoReducer =
  (identity: ActionIdentity, defaultRextInfo: IRextInfo) =>
  (
    info: IRextInfo = defaultRextInfo,
    action: IRextAction = defaultRextAction,
  ) => {
    const { type, payload } = action;
    switch (type) {
      case identity.REXT_FETCH.REQUEST:
      case identity.REXT_UPDATE.REQUEST:
      case identity.REXT_MULTI_FETCH.REQUEST:
      case identity.REXT_MULTI_UPDATE_FETCH.REQUEST:
        return {
          ...info,
          params: payload.params,
          fetching: true,
          isUpdated:
            type === identity.REXT_UPDATE.REQUEST ||
            type === identity.REXT_MULTI_UPDATE_FETCH.REQUEST
              ? true
              : info.isUpdated,
          hasError: false,
          message: undefined,
        };
      case identity.REXT_FETCH.SUCCESS:
      case identity.REXT_UPDATE.SUCCESS:
      case identity.REXT_MULTI_FETCH.SUCCESS:
      case identity.REXT_MULTI_UPDATE_FETCH.SUCCESS:
        return {
          ...info,
          params: payload.params,
          fetching: false,
          isUpdated:
            type === identity.REXT_UPDATE.SUCCESS ||
            type === identity.REXT_MULTI_UPDATE_FETCH.SUCCESS
              ? false
              : info.isUpdated,
          hasError: false,
          message: payload.message,
        };
      case identity.REXT_FETCH.FAILURE:
      case identity.REXT_UPDATE.FAILURE:
      case identity.REXT_MULTI_FETCH.FAILURE:
      case identity.REXT_MULTI_UPDATE_FETCH.FAILURE:
        return {
          ...info,
          params: payload.params,
          fetching: false,
          isUpdated:
            type === identity.REXT_UPDATE.FAILURE ||
            type === identity.REXT_MULTI_UPDATE_FETCH.FAILURE
              ? false
              : info.isUpdated,
          hasError: true,
          message: payload.message,
        };
      case identity.RESET_UPDATE_STATE:
        return {
          ...info,
          isUpdated: false,
        };
      default:
        return info;
    }
  };
export const itemsReducer =
  (identity: ActionIdentity) =>
  (items: {} = {}, action: IRextAction = defaultRextAction) => {
    const { type, payload, meta } = action;
    const { keys } = meta || {};
    switch (type) {
      case identity.REXT_FETCH.SUCCESS:
      case identity.REXT_UPDATE.SUCCESS:
      case identity.REXT_MULTI_FETCH.SUCCESS:
        // case identity.REXT_MULTI_UPDATE_FETCH.SUCCESS:
        return {
          data: getData(items, payload.items, keys, payload.params),
        };
      default:
        return items;
    }
  };

function getData(
  previousData: any,
  newData: any,
  keys: IRextKeys,
  params: IRextParams | IRextParams[] | undefined,
) {
  if (keys.transformation) {
    if (keys.maintainOldValues) {
      return keys.transformation(newData, previousData, params);
    }
    return keys.transformation(newData);
  } else {
    if (keys.maintainOldValues) {
      return { ...previousData, ...newData };
    }
    return newData;
  }
}
export const resourcesReducer =
  (identity: ActionIdentity) =>
  (
    resources: RextResourcesReducer = {},
    action: IRextAction = defaultRextAction,
  ) => {
    const { type, payload } = action;
    switch (type) {
      case identity.REXT_FETCH.REQUEST:
      case identity.REXT_UPDATE.REQUEST:
      case identity.REXT_MULTI_FETCH.SUCCESS:
      case identity.REXT_MULTI_UPDATE_FETCH.SUCCESS: {
        return {
          ...resources,
          ...payload.resources,
        };
      }
      default:
        return resources;
    }
  };
