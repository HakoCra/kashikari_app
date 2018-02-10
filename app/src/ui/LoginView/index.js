import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class LoginView extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.state)
    this.state = {
      user_name: this.props.state.infrastructure.login_info.user_name,
      password: this.props.state.infrastructure.login_info.password
    };
  }

  render() {
    const state = this.props.state;

    return (
      !state.infrastructure.login_info.available ? 
        <View style={styles.root}>
          <TextInput
            style={styles.text_input}
            onChangeText={(user_name) => this.setState({user_name})}
            value={this.state.user_name}
          />
          <TextInput
            style={styles.text_input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />

          <Button
            onPress={() => alert("pressed!")}
            title="login"
            color="#007fff"
            accessibilityLabel="login to kashikari"
          />
        </View>
      : null
    );
  }
}

export default connect(state => ({state}))(LoginView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  text_input: {
    height: 40
  },
});
