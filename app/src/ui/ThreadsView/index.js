import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class ThreadCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => boundActionCreator(types.NAVIGATOR_PUSH, {scine_id: 'ChatView'})}
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
  render() {
    return (
      <View style={styles.root}>
        <ScrollView style={styles.thread_cards}>
          <ThreadCard
            username="uehara1414"
            text="こんにちは" />
          <ThreadCard
            username="issac"
            text="さようなら" />
        </ScrollView>

        <TouchableOpacity
          onPress={() => alert("pressed")}
          style={styles.delete_button}>
          <Image
            source={require('../assets/delete_button.png')}
            resizeMode='contain'
            style={styles.delete_button__icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({state}))(ThreadsView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  thread_cards: {
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
    position: "absolute",
    top: 0,
    right: 0,
  },
  delete_button__icon: {
    backgroundColor: "#000",
  },
});
