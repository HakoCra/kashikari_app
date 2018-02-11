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
        {true ? <Text>{JSON.stringify(state.infrastructure.beacons)}</Text> : null}
        <Navigator>
          <RequestBoard
            id={'RequestBoard'}
            title={'リクエスト一覧'} />
          <ThreadsView
            id={'ThreadsView'}
            title={''} />
          <ConfirmRequestView
            id={'ConfirmRequestView'}
            title={'リクエスト一覧'} />
          <ChatView
            id={'ChatView'}
            title={'リクエスト一覧'} />
          <AddRequestView
            id={'AddRequestView'}
            title={'リクエスト一覧'} />
        </Navigator>
        <LoginView />
        <Text>state.application.requests: {JSON.stringify(state.application.requests)}</Text>
        <Text>state.application.messages: {JSON.stringify(state.application.messages)}</Text>
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
