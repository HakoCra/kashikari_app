import initial_state from './initialState';
import * as types from './types';
import assignDeep from 'assign-deep';

const reducers = {
  [types.SET_ACTIVE_TASK_INDEX](old_state, action){
    let state = assignDeep({}, old_state);
    state.active_task_index = action.index;
    return state;
  },
};

const reducer = (state = initial_state, action) => {
  return reducers.hasOwnProperty(action.type) ? reducers[action.type](state, action) : state;
};

export default reducer;
