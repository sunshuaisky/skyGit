import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import Viewutils from '../../utils/ViewUtils'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props)
  }

  onSave() {
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'自定义标签'}
          statusBar={{
            backgroundColor: '#6495ED'
          }}
          leftButton={Viewutils.getLeftButton(() => this.onSave())}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  tips: {
    fontSize: 29
  }
})
