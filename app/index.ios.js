'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/index'
import Root from './src/ui/Root';

class Kashikari extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => Kashikari
);
