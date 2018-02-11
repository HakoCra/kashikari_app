import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class LoginView extends React.Component {
  constructor(props){
    super(props);
    console.log("ligin view", this.props.state)
    this.state = {
      username: this.props.state.application.user.username,
      password: this.props.state.application.user.password
    };
  }

  render() {
    const state = this.props.state;

    return (
      !state.infrastructure.login_available ? 
        <View style={styles.root}>
          <Text style={styles.label}>user name</Text>
          <View style={styles.input_container}>
            <TextInput
              style={styles.text_input}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
          </View>

          <Text style={styles.label}>password</Text>
          <View style={styles.input_container}>
            <TextInput
              style={styles.text_input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>

          {state.infrastructure.login_failed ? <Text style={styles.error_text}>パスワードが違います</Text> : null}

          <TouchableOpacity
            onPress={() => boundActionCreator(types.SET_USER, {
              user: {
                username: this.state.username,
                password: this.state.password
              }
            })}
            style={styles.button_container}
          >
            <Text style={styles.button}>login</Text>
          </TouchableOpacity>
        </View>
      : null
    );
  }
}

export default connect(state => ({state}))(LoginView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#ff8c00'
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
  error_text:{
    marginTop: 30,
    color: "#f00",
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
