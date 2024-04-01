import { SagaIterator } from 'redux-saga';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { rextActionFunctions } from './actions';
import { fetchRequest, getFullUrl } from 'Api';
import { IRextAction, ActionIdentity, IRextParams } from './interface';

function* performRequestRextOperation(
  action: IRextAction,
): IterableIterator<{}> {
  const { meta, payload } = action;
  const { url, method, body, headers } = payload.params! as IRextParams;
  const {
    keys: { getBaseUrl, getToken },
  } = meta;
  try {
    const token: string = (yield select(getToken))!;

    const requesturl: string = getFullUrl(
      (yield select(getBaseUrl))!,
      url,
      payload.params as IRextParams,
    );
    const response: any = yield call(
      fetchRequest,
      requesturl,
      token,
      method,
      body,
      headers,
    );
    yield put(
      rextActionFunctions.success(
        meta,
        payload.params!,
        response.data || response.record || response,
        response.message || 'Execution Done Successfully',
      ),
    );
  } catch (error: any) {
    const message = error.message || error.errorText || error;
    yield put(rextActionFunctions.failure(meta, payload.params!, message));
  }
}

function* performRequestRextMultiOperation(
  action: IRextAction,
): IterableIterator<{}> {
  const { meta, payload } = action;
  const result: any = {};
  try {
    for (const params of payload.params! as IRextParams[]) {
      const { url, method, body, headers, multiIdentity } = params;
      const {
        keys: { getBaseUrl, getToken },
      } = meta;

      const token: string = (yield select(getToken))!;

      const requesturl: string = getFullUrl(
        (yield select(getBaseUrl))!,
        url,
        params,
      );
      const response: any = yield call(
        fetchRequest,
        requesturl,
        token,
        method,
        body,
        headers,
      );
      result[multiIdentity || 'dump'] =
        response.data?.result || response.data || result;
    }

    yield put(
      rextActionFunctions.success(
        meta,
        payload.params!,
        result,
        'Execution Done Successfully',
      ),
    );
  } catch (error: any) {
    const message = error.message || error.errorText || error;
    yield put(rextActionFunctions.failure(meta, payload.params!, message));
  }
}

export default function (actionidentity: ActionIdentity) {
  return function* watchRextEvent(): SagaIterator {
    yield takeLatest(
      actionidentity.REXT_FETCH.REQUEST,
      performRequestRextOperation,
    );
    yield takeLatest(
      actionidentity.REXT_UPDATE.REQUEST,
      performRequestRextOperation,
    );
    yield takeLatest(
      actionidentity.REXT_MULTI_FETCH.REQUEST,
      performRequestRextMultiOperation,
    );
    yield takeLatest(
      actionidentity.REXT_MULTI_UPDATE_FETCH.REQUEST,
      performRequestRextMultiOperation,
    );
  };
}
