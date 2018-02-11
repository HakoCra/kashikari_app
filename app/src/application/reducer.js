import initial_state from './initialState';
import * as types from './types';
import assignDeep from 'assign-deep';
import BeaconEmitter from '../infrastructure/BeaconEmitter';

const reducers = {
  [types.INIT_STATE](old_state, action){
    let state = assignDeep({}, old_state);
    state = assignDeep({}, state, action.state);
    return state;
  },
  [types.SET_USER](old_state, action){
    let state = assignDeep({}, old_state);
    state.user = assignDeep({}, state.user, action.user);

    if(action.user.major !== undefined && action.user.minor !== undefined){
      BeaconEmitter.setBroadcast(action.user.major, action.user.minor);
    }
    return state;
  },
};

const reducer = (state = initial_state, action) => {
  return reducers.hasOwnProperty(action.type) ? reducers[action.type](state, action) : state;
};

export default reducer;
