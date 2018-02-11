import boundActionCreator from '../../ui/boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

import { AsyncStorage } from 'react-native';

import {INIT_STORE} from '../../store/index';

const STORE_KEY = 'APPLICATION_STATE';

const saveSettings = state => {
  AsyncStorage.setItem(STORE_KEY, JSON.stringify(state.application));
  // AsyncStorage.setItem(STORE_KEY, "");
};

const loadSettings = () => {
  AsyncStorage.getItem(STORE_KEY)
    .then(res => {
      const application_state = JSON.parse(res);

      boundActionCreator(app_types.INIT_STATE, {
        state: application_state
      });
      boundActionCreator(app_types.SET_USER, {
        user: application_state.user
      });
    }
  );
};

const tutorealFetcher = store => next => action => {
  //console.log("@middleware", store.getState());
  if(action.type === INIT_STORE)loadSettings();
  saveSettings(store.getState());
  next(action);
};

export default tutorealFetcher;
