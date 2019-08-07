/**
 *
 */

import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Girl from './Girl'
import NavigationBar from '../common/NavigationBar'

export default class Boy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Boy'}
          statusBar={{
            backgroundColor: 'red'
          }}
          style={{
            backgroundColor: 'red'
          }}
        />
        <Text style={styles.text}>I am Boy</Text>
        <Text
          style={styles.text}
          onPress={() => {
            this.props.navigator.push({
              component: Girl,
              params: {
                word: '玫瑰',
                onCallBack: word => {
                  this.setState({
                    word: word
                  })
                }
              }
            })
          }}
        >
          送玫瑰
        </Text>
        <Text style={styles.text}>{this.state.word}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20
  }
})
