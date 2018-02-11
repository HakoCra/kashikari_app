import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

const processDeleteRequest = (request_id, state) => {
  const token = state.application.user.token;
  const api_server = state.infrastructure.api_server;
  fetch(`${api_server}/requests/${request_id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

const deleteRequest = store => next => action => {
  if(action.type === infra_types.DELETE_REQUEST){
    processDeleteRequest(action.request_id, store.getState());
  }
  next(action);
};

export default deleteRequest;
