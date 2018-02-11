import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class RequestBoard extends React.Component {
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
      <Text>request board</Text>
    );
  }
}

export default connect(state => ({state}))(RequestBoard);

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
  label: {
    marginTop: 70,
    color: "rgba(255, 255, 255, 0.7)",
    borderBottomColor: '#fff',
    borderBottomWidth: 5,
  },
  text_input: {
    height: 30,
    borderBottomColor: '#fff',
    borderBottomWidth: 5,
    color: "#fff"
  },
  input_container: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  text:{
    marginTop: 30,
    color: "#fff",
    textAlign: "center",
    fontSize: 15
  },
  button: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  button_container: {
    marginTop: 50,
  }
});
