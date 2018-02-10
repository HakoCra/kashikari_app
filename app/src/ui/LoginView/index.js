import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class LoginView extends React.Component {
  render() {
    const state = this.props.state;

    // console.log(this.props.state.application.view_state);
    return (
      <View style={styles.root}>
        <Text>login</Text>
      </View>
    );
  }
}

export default connect(state => ({state}))(LoginView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  ibeacon_emitter: {
    flex: 1,
  },
});
