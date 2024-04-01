import { IRextAction, IRextInfo } from './interface';

export const defaultRextInfo: IRextInfo = {
  hasError: false,
  message: undefined,
  params: undefined,
  isCancelled: false,
  fetching: false,
  isUpdated: undefined,
};

export const defaultRextAction: IRextAction = {
  meta: {
    actions: {} as any,
    keys: {} as any,
  },
  payload: {},
  type: '',
};
