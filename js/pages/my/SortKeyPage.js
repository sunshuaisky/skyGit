import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import ArrayUtils from '../../utils/ArrayUtils'
import ViewUtils from '../../utils/ViewUtils'
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'

export default class SortKeyPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.dataArray = []
    this.sortResultArray = []
    this.originalCheckedArray = []
    this.state = {
      checkedArray: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.languageDao
      .fetch()
      .then(result => {
        this.getCheckedItems(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getCheckedItems(result) {
    this.dataArray = result
    let checkedArray = []
    for (let i = 0, len = result.length; i < len; i++) {
      let data = result[i]
      if (data.checked) checkedArray.push(data)
    }
    this.setState({
      checkedArray: checkedArray
    })
    this.originalCheckedArray = ArrayUtils.clone(checkedArray)
  }

  onBack() {
    if (
      ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)
    ) {
      this.props.navigator.pop()
      return
    }
    Alert.alert('提示', '需要保存修改吗？', [
      {
        text: '不保存',
        onPress: () => {
          this.props.navigator.pop()
        },
        style: 'cancel'
      },
      {
        text: '保存',
        onPress: () => {
          this.onSave(true)
        }
      }
    ])
  }

  onSave(isChecked) {
    if (
      !isChecked &&
      ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)
    ) {
      this.props.navigator.pop()
      return
    }
    this.getSortResult()
    this.languageDao.save(this.sortResultArray)
    this.props.navigator.pop()
  }

  getSortResult() {
    this.sortResultArray = ArrayUtils.clone(this.dataArray)
    for (let i = 0, l = this.originalCheckedArray.length; i < l; i++) {
      let item = this.originalCheckedArray[i]
      let index = this.dataArray.indexOf(item)
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="我的"
          statusBar={{
            backgroundColor: '#6495ED'
          }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={ViewUtils.getRightButton('保存', () => this.onSave())}
        />
        <SortableListView
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(
              e.to,
              0,
              this.state.checkedArray.splice(e.from, 1)[0]
            )
            this.forceUpdate()
          }}
          renderRow={row => <SortCell data={row} {...this.props} />}
        />
      </View>
    )
  }
}

class SortCell extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        delayLongPress={500}
        style={styles.item}
        {...this.props.sortHandlers}
      >
        <View
          style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={require('./images/ic_sort.png')}
            style={styles.image}
          />
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2'
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  hidden: {
    height: 0
  },
  item: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 50,
    justifyContent: 'center'
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray'
  },
  image: {
    tintColor: '#2196F3',
    height: 16,
    width: 16,
    marginRight: 10
  }
})
