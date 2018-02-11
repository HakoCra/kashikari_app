import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class ConfirmRequestView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.state.application.user.username,
      password: this.props.state.application.user.password
    };
  }

  render() {
    const state = this.props.state;
    const request = state.application.requests.find(x => x.id === state.application.active_request_id);

    return (
      <View style={styles.root}>
        <Text style={styles.header}>ユーザー</Text>
        <Text style={styles.text}>{request.username}</Text>
        <Text style={styles.header}>リクエスト</Text>
        <Text style={styles.text}>{request.title}</Text>
        <Text style={styles.header}>報酬</Text>
        <Text style={styles.text}>{request.reward === null ? 'なし' : request.reward}</Text>
        <Text style={styles.header}>コメント</Text>
        <Text style={styles.text}>{request.comment === null ? 'なし' : request.comment}</Text>
        <TouchableOpacity
          onPress={() => boundActionCreator(types.NAVIGATOR_PUSH, {scine_id: 'ChatView'})}
          style={styles.button}>
          <Text style={styles.button_text}>承認</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({state}))(ConfirmRequestView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 30,
  },
  header: {
    marginTop: 30,
  },
  text: {
    marginTop: 10,
    fontSize: 30,
  },
  button: {
    flex: 1,
    marginTop: 50,

  },
  button_text: {
    fontSize: 25,
    textAlign: "center",
    color: "#007fff"
  }
});
