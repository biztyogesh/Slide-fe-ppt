import { SagaIterator } from 'redux-saga';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { AUTH_ACTION, CURRENT_USER_ACTION } from '../actions';
import { fetchRequest } from 'Api';
import { getBaseUrl, getToken } from 'store/selectors';
import { StandardAction } from 'store/common';
import { URLRoutes } from 'URLRoutes';

function* performRequestLogin(
  action: StandardAction
): IterableIterator<{}> {
  const { payload } = action;

  try {
    const token: string = (yield select(getToken))!;
    const baseUrl: string = (yield select(getBaseUrl))!;
    const response: any = yield call(
      fetchRequest,
      `${baseUrl}${URLRoutes.server.login}`,
      token,
      "post",
      payload
    );
    const userToken = `Bearer ${response.token}`
    localStorage.setItem("token", userToken);

    const responseUser: any = yield call(
      fetchRequest,
      `${baseUrl}${URLRoutes.server.currentuser}`,
      userToken,
      "get"
    );

    yield put({type: AUTH_ACTION.SUCCESS, payload: {user: responseUser.data, token: userToken}});
  } catch (error: any) {
    const message = error.message || error.errorText || error;
    yield put({type: AUTH_ACTION.FAILURE, payload: message});
  }
}

function* performCurrentUserDetail(
  action: StandardAction
): IterableIterator<{}> {
  try {
    const token: string = (yield select(getToken))!;
    const baseUrl: string = (yield select(getBaseUrl))!;
    const response: any = yield call(
      fetchRequest,
      `${baseUrl}${URLRoutes.server.currentuser}`,
      token,
      "get"
    );
    yield put({type: CURRENT_USER_ACTION.SUCCESS, payload: {user: response.data}});
  } catch (error: any) {
    const message = error.message || error.errorText || error;
    yield put({type: CURRENT_USER_ACTION.FAILURE, payload: message});
  }
}

export function* watchAuthEvent(): SagaIterator {
  yield takeLatest(
    AUTH_ACTION.REQUEST,
    performRequestLogin,
  );
  yield takeLatest(
    CURRENT_USER_ACTION.REQUEST,
    performCurrentUserDetail,
  );
};
