import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native'
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.state = {
      languages: []
    }
  }

  componentDidMount() {}

  loadData() {
    this.languageDao
      .fetch()
      .then(result => {
        this.setState({
          languages: result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    this.loadData()

    let content =
      this.state.languages.length > 0 ? (
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar />}
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
        >
          {this.state.languages.map((result, i) => {
            return result.checked ? (
              <PopolarTab key={i} tabLabel={result.name}>
                {result.name}
              </PopolarTab>
            ) : null
          })}
        </ScrollableTabView>
      ) : null
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'最热'}
          statusBar={{
            backgroundColor: '#2196F3'
          }}
        />
        {content}
      </View>
    )
  }
}

class PopolarTab extends Component {
  constructor(props) {
    super(props)
    this.dataRepository = new DataRepository()
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isLoading: false
    }
  }

  componentDidMount() {
    this.onLoad()
  }

  /**
   * 判断缓存过期
   * @param {*} longTime
   */

  checkDate(longTime) {
    let currentDate = new Date()
    let targetDate = new Date()
    targetDate.setTime(longTime)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if (currentDate.getHours() - targetDate.getHours() > 4) return false
    return true
  }

  onLoad() {
    this.setState({
      isLoading: true
    })
    let url = URL + this.props.tabLabel + QUERY_STR
    this.dataRepository
      .fetchRepository(url)
      .then(result => {
        let items = result && result.items ? result.items : result ? result : []
        if (
          result &&
          result.update_date &&
          !this.checkDate(result.update_date)
        ) {
          return this.dataRepository.fetchNetrepository(url)
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          isLoading: false
        })
      })
      .then(items => {
        if (!items || items.length === 0) return
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error),
          isLoading: false
        })
      })
  }

  renderRow(data) {
    return <RepositoryCell data={data} />
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={data => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.onLoad()
              }}
              color={['#2196F3']}
              tintColor={'#2196F3'}
              title={'Loading...'}
              titleColor={'#2196F3'}
            />
          }
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
