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
import Toast, { DURATION } from 'react-native-easy-toast'

var data = {
  result: [
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    },
    {
      email: '592989038@qq.com',
      fullName: 'phoenixIcarus'
    }
  ]
}

export default class ListViewTest extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(data.result),
      isLoading: true
    }
    this.onLoad()
  }

  renderRow(item) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            this.toast.show(`你单击了${item.fullName}`, DURATION.LENGTH_LONG)
          }}
        >
          <Text style={styles.text}>{item.fullName}</Text>
          <Text style={styles.text}>{item.email}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View key={rowID} style={styles.line} />
  }

  renderFooter() {
    return (
      <Image
        style={{ width: 400, height: 100 }}
        source={{
          uri:
            'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'
        }}
      />
    )
  }

  onLoad() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title="ListViewTest" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={item => this.renderRow(item)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
            this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)
          }
          renderFooter={() => this.renderFooter()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.setState({
                  isLoading: true
                })
                this.onLoad()
              }}
            />
          }
        />
        <Toast
          ref={toast => {
            this.toast = toast
          }}
        />
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
    fontSize: 18
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: 'black'
  }
})
