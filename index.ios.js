/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View } from 'react-native'
import setup from './js/pages/setup'

export default class skyGit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'tb_polular'
    }
  }
  render() {
    return <View style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})

AppRegistry.registerComponent('skyGit', () => setup)
