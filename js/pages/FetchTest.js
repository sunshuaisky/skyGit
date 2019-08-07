/**
 *
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  RefreshControl
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import HttpUtils from '../utils/HttpUtils'

export default class FetchTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '返回结果'
    }
  }

  onLoad(url) {
    this.setState({ result: '请求中' })
    // fetch(url)
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({ result: JSON.stringify(result) })
    //   })
    //   .catch(error => {
    //     this.setState({ result: JSON.stringify(error) })
    //   })
    HttpUtils.get(url)
      .then(result => {
        this.setState({ result: JSON.stringify(result) })
      })
      .catch(error => {
        this.setState({ result: JSON.stringify(error) })
      })
  }

  onSubmit(url, data) {
    this.setState({ result: '请求中' })
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(result => {
    //     this.setState({ result: JSON.stringify(result) })
    //   })
    //   .catch(error => {
    //     this.setState({ result: JSON.stringify(error) })
    //   })
    HttpUtils.post(url, data)
      .then(result => {
        this.setState({ result: JSON.stringify(result) })
      })
      .catch(error => {
        this.setState({ result: JSON.stringify(error) })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="FetchTest" />
        <Text
          style={styles.text}
          onPress={() =>
            this.onLoad(
              'https://www.easy-mock.com/mock/5bfb6538b88b2a71b0d2d11a/example/getData'
            )
          }
        >
          获取数据
        </Text>
        <Text
          style={styles.text}
          onPress={() =>
            this.onSubmit(
              'https://www.easy-mock.com/mock/5bfb6538b88b2a71b0d2d11a/example/postData',
              { userName: 'phoenixIcarus', passWord: '123456' }
            )
          }
        >
          提交数据
        </Text>
        <Text style={styles.text}>返回结果：{this.state.result}</Text>
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
    fontSize: 22
  }
})
