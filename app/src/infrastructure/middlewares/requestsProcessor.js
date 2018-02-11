import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

const fetchRequests = (user, state) => {
  const token = state.application.user.token;
  const api_server = state.infrastructure.api_server;
  fetch(`${api_server}/requests`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if(res.error !== 'Authorization error'){
        const requests = res.map((val) => {
          return {
            id: val.id,
            username: val.user.username,
            title: val.title,
            timelimit: val.timelimit,
            reward: val.reward,
            comment: val.comment,
            accepted_users: val.accepted_users,
          }
        })
        boundActionCreator(app_types.SET_REQUESTS, {
          requests: requests
        });
      }else{
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: false});
        boundActionCreator(infra_types.SET_LOGIN_FAILED, {failed: true});
      }
    });
};

const fetchMessages = (user, state) => {
  const token = state.application.user.token;
  const api_server = state.infrastructure.api_server;
  fetch(`${api_server}/messages`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if(res.error !== 'Authorization error'){

        boundActionCreator(app_types.SET_MESSAGES, {
          messages: res
        });

      }else{
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: false});
        boundActionCreator(infra_types.SET_LOGIN_FAILED, {failed: true});
      }
    });
};

const requestsProcessor = store => next => action => {
  if(action.type === infra_types.FETCH_CLOCK)
  {
    fetchRequests(action.user, store.getState());
    fetchMessages(action.user, store.getState());
  }
  next(action);
};

export default requestsProcessor;
