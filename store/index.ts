import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const devMode = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer,
  middleware: [thunk as ThunkMiddleware, logger],
  devTools: devMode
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
