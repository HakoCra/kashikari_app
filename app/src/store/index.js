import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import application from '../application/reducer';
import infrastructure from '../infrastructure/reducer';

import loginFetcher from '../infrastructure/middlewares/loginFetcher';
import requestsFetcher from '../infrastructure/middlewares/requestsFetcher';
import storeSetter from '../infrastructure/middlewares/storeSetter';

export const INIT_STORE = 'INIT_STORE';

const store = createStore(combineReducers({
  application,
  infrastructure,
}), applyMiddleware(loginFetcher, requestsFetcher, storeSetter));

export default store;
