import initial_state from './initialState';
import * as types from './types';
import assignDeep from 'assign-deep';

const reducers = {
  [types.SET_BEACON](old_state, action){
    let state = assignDeep({}, old_state);
    const current_beacon = state.beacons.find(x => x.major === action.beacon.major &&  x.minor === action.beacon.minor);
    if(current_beacon === undefined){
      state.beacons = [...state.beacons, action.beacon];
    }else{
      state.beacons[state.beacons.indexOf(current_beacon)] = action.beacon;
    }
    return state;
  },
  [types.SET_BEACONS](old_state, action){
    let state = assignDeep({}, old_state);
    for(let beacon of action.beacons)state = reducers[types.SET_BEACON](state, {beacon});
    return state;
  },
  [types.SET_LOGIN_AVAILABLE](old_state, action){
    let state = assignDeep({}, old_state);
    state.login_available = action.available
    return state;
  },
  [types.SET_LOGGING_IN](old_state, action){
    let state = assignDeep({}, old_state);
    state.logging_in = action.logging_in;
    return state;
  },
  [types.SET_LOGIN_FAILED](old_state, action){
    let state = assignDeep({}, old_state);
    state.login_failed = action.failed
    return state;
  },
  [types.FETCH_CLOCK](old_state, action){
    let state = assignDeep({}, old_state);
    return state;
  },
  [types.ACCEPT_REQUESTS](old_state, action){
    let state = assignDeep({}, old_state);
    return state;
  },
};

const reducer = (state = initial_state, action) => {
  return reducers.hasOwnProperty(action.type) ? reducers[action.type](state, action) : state;
};

export default reducer;
