import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

class ThreadCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          boundActionCreator(app_types.NAVIGATOR_PUSH, {scine_id: 'ChatView'});
          boundActionCreator(app_types.SET_ACTIVE_USERNAME, {username: this.props.username});
        }}
        style={styles.thread_card}>
        <Text style={styles.thread_card__username}>{this.props.username}</Text>
        <Text style={styles.thread_card__text}>{this.props.text}</Text>
        <View style={styles.thread_card__icon_container}>
          <Image
            source={require('../assets/request_card_icon.png')}
            resizeMode='contain'
            style={styles.thread_card__icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

class ThreadsView extends React.Component {
  confirm(callback){
    Alert.alert(
      "このリクエストを削除します",
      "よろしいですか？",
      [
        {
          text: "いいえ",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "はい",
          onPress: callback
        },
      ],
      {
        cancelable: false
      }
    );
  }
  render() {
    const state = this.props.state;
    const request = state.application.requests.find(x => x.id === state.application.active_request_id);
    const thread_cards = request.accepted_users.map(x => 
      <ThreadCard
        username={x.username}
        text={x.latest_message !== undefined ? x.latest_message.text : 'メッセージはありません'}
        key={x.id} />
    );

    return (
      <View style={styles.root}>
        <ScrollView style={styles.thread_cards}>
          {thread_cards}
          {thread_cards.length === 0 ? <Text style={styles.text}>まだ助っ人がいません</Text> : null}

          <TouchableOpacity
            onPress={() => this.confirm(() => {
              boundActionCreator(app_types.NAVIGATOR_POP);
              boundActionCreator(infra_types.DELETE_REQUEST, {request_id: request.id});
            })}
            style={styles.delete_button}>
            <Text style={styles.delete_button__text}>このリクエストを削除</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({state}))(ThreadsView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  thread_cards: {
    padding: 30,
    overflow: "visible",
  },
  thread_card: {
    padding: 20,
    marginTop: 30,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    borderRadius: 2,
  },
  thread_card__username: {
    fontSize: 28,
    fontWeight: "300",
    marginBottom: 10,
  },
  thread_card__icon_container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 15,
  },
  thread_card__icon: {
    height: 20,
  },
  delete_button: {
    marginTop: 50,
  },
  delete_button__text: {
    color: "#f00",
    textAlign: "center"
  },
  text: {
    color: "#aaa",
    marginTop: 50,
    textAlign: "center",
  }
});
