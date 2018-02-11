import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

const fetchRequests = (user, state) => {
  console.log('u', user.username === undefined || user.password === undefined);
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
        res.map((val) => {
          return Object.assign({}, {
            id: val.id,
            title: val.title,
            timelimit: val.timelimit,
            reward: val.reward,
            comment: val.comment
          })
        })
        /*
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: true});
        boundActionCreator(app_types.SET_USER, {
          user:{
            token: res.access_token,
            major: res.beacon.major,
            minor: res.beacon.minor
          }
        });
        */
      }else{
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: false});
        boundActionCreator(infra_types.SET_LOGIN_FAILED, {failed: true});
      }
    });
};

const requestsFetcher = store => next => action => {
  if(action.type === app_types.SET_USER)fetchRequests(action.user, store.getState());
  next(action);
};

export default requestsFetcher;
