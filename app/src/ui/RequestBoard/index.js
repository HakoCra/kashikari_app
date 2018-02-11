import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as types from '../../application/types';

class RequestCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          boundActionCreator(types.NAVIGATOR_PUSH, {scine_id: this.props.is_own ? 'ThreadsView' : 'ConfirmRequestView'});
          boundActionCreator(types.SET_ACTIVE_REQUEST, {request_id: this.props.id});
        }}
        style={[styles.request_card, this.props.is_own ? styles.request_card__is_active : null]}>
        <Text style={styles.request_card__title}>{this.props.title}</Text>
        <Text style={styles.request_card__text}>ユーザー : {this.props.user}</Text>
        <Text style={styles.request_card__text}>報酬 : {this.props.reward ===  null ? 'なし' : this.props.reward}</Text>
        <View style={styles.request_card__badge_container}>
          <Text style={styles.request_card__badge}>{this.props.badge}</Text>
          <Image
            source={require('../assets/request_card_icon.png')}
            resizeMode='contain'
            style={styles.request_card__icon} />
        </View>
      </TouchableOpacity>
    );
  }
}

class RequestBoard extends React.Component {
  render() {
    const state = this.props.state;
    const request_cards = state.application.requests.map(x => 
      <RequestCard
        id={x.id}
        title={x.title}
        user={x.username}
        reward={x.reward}
        badge={x.accepted_users.length}
        is_own={x.username === state.application.user.username}
        key={x.id} />
    );

    return (
      <View style={styles.root}>
        <ScrollView style={styles.request_cards}>
          {request_cards}
        </ScrollView>

        <TouchableOpacity
          style={styles.add_button}
          onPress={() => boundActionCreator(types.NAVIGATOR_PUSH, {scine_id: 'AddRequestView'})} >
          <Image
            source={require('../assets/add_button.png')}
            resizeMode='contain'
            style={styles.button_image} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({state}))(RequestBoard);

const add_button_size = 50;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  request_cards: {
    overflow: "visible",
  },
  request_card: {
    padding: 20,
    marginTop: 30,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    borderRadius: 2,
  },
  request_card__is_active: {
    backgroundColor: "#fff1e0"
  },
  request_card__title: {
    fontSize: 28,
    fontWeight: "300",
    marginBottom: 10,
  },
  request_card__badge_container: {
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
  request_card__badge: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 30,
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: "#ff562f",
    borderRadius: 15,
    overflow: "hidden",
  },
  request_card__icon:{
    height: 20,
  },
  add_button:{
    position: "absolute",
    right: 30,
    bottom: 30,
    width: add_button_size,
    height: add_button_size,
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowColor: '#000',
    shadowOffset: {height: 7, width: 0},
    borderRadius: add_button_size / 2,
  },
  button_image: {
    width: add_button_size,
    height: add_button_size,
  }
});
