import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import boundActionCreator from '../boundActionCreator';
import * as app_types from '../../application/types';
import * as infra_types from '../../infrastructure/types';

class AddRequestView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "title",
      title: "reward",
      title: "comment",
    };
  }

  render() {
    const state = this.props.state;

    return (
      <View style={styles.root}>
        <Text style={styles.label}>リクエスト*</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.text_input}
            onChangeText={(title) => this.setState({title})}
          />
        </View>

        <Text style={styles.label}>報酬</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.text_input}
            onChangeText={(reward) => this.setState({reward})}
          />
        </View>

        <Text style={styles.label}>コメント</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.text_input}
            onChangeText={(comment) => this.setState({comment})}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            boundActionCreator(infra_types.POST_REQUEST, {
              request: {
                title: this.state.title,
                reward: this.state.reward,
                comment: this.state.comment
              }
            });
            boundActionCreator(app_types.NAVIGATOR_POP);
          }}
          style={styles.button_container}
        >
          <Text style={styles.button}>作成</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({state}))(AddRequestView);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  label: {
    marginTop: 50,
  },
  text_input: {
    height: 30,
  },
  input_container: {
    borderBottomColor: '#ff9d27',
    borderBottomWidth: 1,
  },
  text:{
    marginTop: 30,
    textAlign: "center",
    fontSize: 15
  },
  button: {
    color: "#007fff",
    textAlign: "center",
    fontSize: 20,
  },
  button_container: {
    marginTop: 50,
  }
});
