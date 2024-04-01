import { configureStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { ApplicationState } from './reducers';
import rootSaga from './saga';

function createStore(preloadedState: object): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = (getDefaultMiddleware: any) => [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware,
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

export default createStore;
