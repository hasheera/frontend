import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

const devMode = process.env.NODE_ENV === 'development';

// listenerMiddleware.startListening({
//   actionCreator: userData,
//   // type: a,
//   effect: async (action, listenerApi) => {
//     console.log("hi")
//     listenerApi.dispatch(setUser(false))
//   }
// })

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
