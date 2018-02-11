import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class Navigator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.state.application.user.username,
      password: this.props.state.application.user.password
    };
  }

  render() {
    const state = this.props.state;

    return (
      null
    );
  }
}

export default connect(state => ({state}))(Navigator);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#ff562f'
  },
});
