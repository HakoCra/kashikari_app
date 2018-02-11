import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
    const scine_id = state.application.navigator_stack[state.application.navigator_stack.length - 1];
    const scine = this.props.children.find(x => x.props.id === scine_id);
    console.log(scine);

    return (
      <View style={styles.root}>
        <View style={styles.main}>
          {scine}
        </View>

        <View style={styles.header}>
          {state.application.navigator_stack.length !== 1 ? 
            <TouchableOpacity
              style={styles.back_button}
              onPress={() => boundActionCreator(types.NAVIGATOR_POP)}>
              <Image
                source={require('../assets/back_button.png')}
                resizeMode='contain'
                style={styles.back_button} />
            </TouchableOpacity>
          : null}
          <Text style={styles.header_title}>{scine.props.getTitle(state)}</Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({state}))(Navigator);

const header_height = 50;
const ios_header_height = 20;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -1 * ios_header_height,
    left: 0,
    right: 0,
    paddingTop: ios_header_height,
    height: header_height + ios_header_height,
    backgroundColor: "#ff9d27",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 5, width: 0 },
  },
  header_title: {
    color: "#fff",
    fontSize: 24,
  },
  back_button: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: ios_header_height,
    height: header_height / 3,
    width: header_height,
  },
  main: {
    marginTop: header_height,
    flex: 1,
  },
});
