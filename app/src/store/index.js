import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import application from '../application/reducer';
import infrastructure from '../infrastructure/reducer';

import loginFetcher from '../infrastructure/middlewares/loginFetcher';

const store = createStore(combineReducers({
  application,
  infrastructure,
}), applyMiddleware(loginFetcher));

export default store;
