import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const logger = createLogger({ level: 'info', collapsed: true });

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

// configure store using redux-toolkit
// https://redux.js.org/redux-toolkit/overview/
const store = configureStore({
  reducer: rootReducer,
  // uses redux-toolkit middlewares (i.e. redux-thunk)
  // and add redux-logger
  middleware: [...getDefaultMiddleware<RootState>(), logger] as const,
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
