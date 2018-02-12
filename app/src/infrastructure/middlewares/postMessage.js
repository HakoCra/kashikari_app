import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

const processPostMessage = (message, state) => {
  console.log(message)
  const token = state.application.user.token;
  const api_server = state.infrastructure.api_server;
  console.log(`${api_server}/messages`)
  fetch(`${api_server}/messages`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(message)
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

const postRequest = store => next => action => {
  if(action.type === infra_types.POST_MESSAGE)
  {
    processPostMessage(action.message, store.getState());
  }
  next(action);
};

export default postRequest;
