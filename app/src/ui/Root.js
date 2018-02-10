import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, DeviceEventEmitter } from 'react-native';
import boundActionCreator from './boundActionCreator';
import * as types from '../application/types';
import BeaconEmitter from '../infrastructure/BeaconEmitter';

import BeaconBroadcast from 'react-native-ibeacon-simulator';

const uuid = '79742E5E-BEDC-4F1E-9976-451A90E7B0D0';
const identifier = 'uehara1414';
const major = 1;
const minor = 3;

BeaconBroadcast.stopAdvertisingBeacon();
BeaconBroadcast.startAdvertisingBeaconWithString(uuid, identifier, major, minor);

class Root extends React.Component {
  render() {
    const state = this.props.state;

    // console.log(this.props.state.application.view_state);
    return (
      <View style={styles.root}>
        <BeaconEmitter />
        <Text>{JSON.stringify(state.infrastructure.beacons)}</Text>
      </View>
    );
  }
}
export default connect(state => ({state}))(Root);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  ibeacon_emitter: {
    flex: 1,
  },
});
