import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, DeviceEventEmitter } from 'react-native';
import boundActionCreator from './boundActionCreator';

import * as types from '../application/types';
import {INIT_STORE} from '../store/index.js';

import LoginView from './LoginView/index';

import BeaconEmitter from '../infrastructure/BeaconEmitter';
BeaconEmitter.initEmitter();
//BeaconEmitter.setBroadcast(12,45);

class Root extends React.Component {
  render() {
    const state = this.props.state;

    return (
      <View style={styles.root}>
        <LoginView />
        <Text>{JSON.stringify(state.infrastructure.beacons)}</Text>
      </View>
    );
  }
}
export default connect(state => ({state}))(Root);

boundActionCreator(INIT_STORE);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  ibeacon_emitter: {
    flex: 1,
  },
});
