import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

import { GiftedChat } from 'react-native-gifted-chat'

class ChatView extends React.Component {
  state = {
    messages: [],
  }

  componentWillReceiveProps(nextProps)  {
    this.setState({
      messages: nextProps.state.application.messages.map((obj) => {
        return {
          _id: obj.id,
          text: obj.text,
          createdAt: new Date(),
          user: {
            _id: obj.target.username === nextProps.state.application.active_username ? 1:2,
            name: obj.username
          }
        }
      }).sort((x1, x2) => x2._id - x1._id)});
  }
  onSend(messages = []) {
    messages.forEach((obj)  =>  {
      const message  = {
        message: {
          target: this.props.state.application.active_username,
          text: obj.text
        }
      }
      boundActionCreator(infra_types.POST_MESSAGE, message);
    })
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
}

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

export default connect(state => ({state}))(ChatView);

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
