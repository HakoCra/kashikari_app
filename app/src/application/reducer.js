import initial_state from './initialState';
import * as types from './types';
import assignDeep from 'assign-deep';

const reducers = {
  [types.INIT_STATE](old_state, action){
    let state = assignDeep({}, old_state);
    state = assignDeep({}, state, action.state);
    return state;
  },
  [types.SET_USER](old_state, action){
    let state = assignDeep({}, old_state);
    state.user = assignDeep({}, state.user, action.user);
    return state;
  },
  [types.NAVIGATOR_PUSH](old_state, action){
    let state = assignDeep({}, old_state);
    state.navigator_stack.push(action.scine_id);
    return state;
  },
  [types.NAVIGATOR_POP](old_state, action){
    let state = assignDeep({}, old_state);
    if(state.navigator_stack.length === 1)return state;
    state.navigator_stack.pop();
    return state;
  },
  [types.SET_REQUESTS](old_state, action){
    let state = assignDeep({}, old_state);
    state.requests = action.requests;
    return state;
  },
  [types.SET_MESSAGES](old_state, action){
    let state = assignDeep({}, old_state);
    state.messages = action.messages;
    return state;
  },
  [types.SET_ACTIVE_REQUEST](old_state, action){
    let state = assignDeep({}, old_state);
    state.active_request_id = action.request_id;
    return state;
  },
  [types.SET_ACTIVE_USERNAME](old_state, action){
    let state = assignDeep({}, old_state);
    state.active_username = action.username;
    return state;
  },
};

const reducer = (state = initial_state, action) => {
  return reducers.hasOwnProperty(action.type) ? reducers[action.type](state, action) : state;
};

export default reducer;
