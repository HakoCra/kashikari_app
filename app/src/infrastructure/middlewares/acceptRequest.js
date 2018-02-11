import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

const processAcceptRequest = (id, state) => {
  const token = state.application.user.token;
  const api_server = state.infrastructure.api_server;
  fetch(`${api_server}/requests/${id}/accept`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if(res.error !== 'Authorization error'){
        console.log(res)
      }else{
        console.log(res)
      }
    });
};

const acceptRequest = store => next => action => {
  if(action.type === infra_types.ACCEPT_REQUESTS)
  {
    processAcceptRequest(action.id, store.getState());
  }
  next(action);
};

export default acceptRequest;
