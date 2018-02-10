import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, DeviceEventEmitter } from 'react-native';
import boundActionCreator from './boundActionCreator';
import * as types from '../application/types';
import BeaconEmitter from '../infrastructure/BeaconEmitter';

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
