import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, DeviceEventEmitter } from 'react-native';
import boundActionCreator from './boundActionCreator';

import * as types from '../application/types';
import {INIT_STORE} from '../store/index.js';

import Navigator from './Navigator/index';
import RequestBoard from './RequestBoard/index';
import ThreadsView from './ThreadsView/index';
import ConfirmRequestView from './ConfirmRequestView/index';
import ChatView from './ChatView/index';
import AddRequestView from './AddRequestView/index';
import LoginView from './LoginView/index';

import BeaconEmitter from '../infrastructure/BeaconEmitter';
BeaconEmitter.initEmitter();
//BeaconEmitter.setBroadcast(12,45);

class Root extends React.Component {
  render() {
    const state = this.props.state;

    return (
      <View style={styles.root}>
        {false ? <Text>{JSON.stringify(state.infrastructure.beacons)}</Text> : null}
        <Navigator>
          <RequestBoard
            id='RequestBoard'
            getTitle={() => 'リクエスト一覧'} />
          <ThreadsView
            id='ThreadsView'
            getTitle={state => '助っ人一覧'} />
          <ConfirmRequestView
            id='ConfirmRequestView'
            getTitle={() => ''} />
          <ChatView
            id='ChatView'
            getTitle={() => ''} />
          <AddRequestView
            id='AddRequestView'
            getTitle={() => 'リクエストを作成'} />
        </Navigator>
        <LoginView />
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
