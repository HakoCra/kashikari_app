import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';
import BeaconEmitter from '../BeaconEmitter';

const login = (user, state) => {
  if(user.username === undefined || user.password === undefined)return;
  boundActionCreator(infra_types.SET_LOGIN_FAILED, {failed: false});
  boundActionCreator(infra_types.SET_LOGGING_IN, {logging_in: true});

  const api_server = state.infrastructure.api_server;
  fetch(`${api_server}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(res => {
      boundActionCreator(infra_types.SET_LOGGING_IN, {logging_in: false});

      if(res.error === undefined){
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: true});
        boundActionCreator(app_types.SET_USER, {
          user:{
            token: res.access_token,
            major: res.beacon.major,
            minor: res.beacon.minor
          }
        });
        BeaconEmitter.setBroadcast(res.beacon.major, res.beacon.minor);
        setInterval(() => boundActionCreator(infra_types.FETCH_CLOCK, {}), 1000 * 3);
      }else{
        boundActionCreator(infra_types.SET_LOGIN_AVAILABLE, {available: false});
        boundActionCreator(infra_types.SET_LOGIN_FAILED, {failed: true});
      }
    });
};

const tutorealFetcher = store => next => action => {
  //console.log("@middleware", store.getState());
  if(action.type === app_types.SET_USER)login(action.user, store.getState());
  next(action);
};

export default tutorealFetcher;
